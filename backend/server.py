from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Email (Emergent managed Resend)
# ---------------------------------------------------------------------------
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        return None
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return None


def _notify_html(title: str, rows: list) -> str:
    cells = "".join(
        f'<tr><td style="padding:6px 12px;font-weight:600;color:#111;width:150px;vertical-align:top">'
        f'{escape(k)}</td><td style="padding:6px 12px;color:#333">{escape(str(v))}</td></tr>'
        for k, v in rows
    )
    return (
        f'<table role="presentation" width="100%" style="font-family:Arial,sans-serif">'
        f'<tr><td style="padding:24px">'
        f'<h2 style="margin:0 0 16px;color:#111;font-size:20px">{escape(title)}</h2>'
        f'<table role="presentation" width="100%" style="border-collapse:collapse">{cells}</table>'
        f'<p style="font-size:12px;color:#888;margin-top:24px">Sent by {escape(EMAIL_FROM_NAME)}. '
        f'This is an internal lead notification. We never ask for passwords or payment details by email.</p>'
        f'</td></tr></table>'
    )


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class EnquiryCreate(BaseModel):
    question: str
    email: Optional[EmailStr] = None


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    studio: Optional[str] = ""
    purpose: str
    message: Optional[str] = ""


class ChatCreate(BaseModel):
    name: Optional[str] = ""
    message: str


class PlanSelectionCreate(BaseModel):
    plan: str
    price: str
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    studio: Optional[str] = ""
    message: Optional[str] = ""


def _doc(kind: str, data: dict) -> dict:
    return {
        "id": str(uuid.uuid4()),
        "kind": kind,
        "created_at": datetime.now(timezone.utc).isoformat(),
        **data,
    }


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "Aura Retouch API"}


@api_router.post("/enquiry")
async def create_enquiry(payload: EnquiryCreate):
    doc = _doc("enquiry", payload.model_dump())
    await db.enquiries.insert_one({**doc})
    subject = f"New editing enquiry — {EMAIL_FROM_NAME}"
    html = _notify_html("New Hero Enquiry", [
        ("Question", payload.question),
        ("Reply email", payload.email or "not provided"),
    ])
    await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=payload.email)
    return {"status": "success", "id": doc["id"]}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    doc = _doc("contact", payload.model_dump())
    await db.contacts.insert_one({**doc})
    subject = f"New contact request ({payload.purpose}) — {EMAIL_FROM_NAME}"
    html = _notify_html("New Contact Request", [
        ("Name", payload.name),
        ("Email", payload.email),
        ("Contact number", payload.phone or "—"),
        ("Studio / Photography", payload.studio or "—"),
        ("Purpose", payload.purpose),
        ("Message", payload.message or "—"),
    ])
    await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=payload.email)
    return {"status": "success", "id": doc["id"]}


@api_router.post("/plan-selection")
async def create_plan_selection(payload: PlanSelectionCreate):
    doc = _doc("plan_selection", payload.model_dump())
    await db.plan_selections.insert_one({**doc})
    subject = f"New plan selection: {payload.plan} ({payload.price}) — {EMAIL_FROM_NAME}"
    html = _notify_html("Someone selected a plan", [
        ("Plan", payload.plan),
        ("Price", payload.price),
        ("Name", payload.name),
        ("Email", payload.email),
        ("Contact number", payload.phone or "—"),
        ("Studio / Photography", payload.studio or "—"),
        ("Message", payload.message or "—"),
    ])
    await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=payload.email)
    return {"status": "success", "id": doc["id"]}


@api_router.post("/chat")
async def create_chat(payload: ChatCreate):
    doc = _doc("chat", payload.model_dump())
    await db.chat_messages.insert_one({**doc})
    return {"status": "success", "id": doc["id"]}


@api_router.get("/chat")
async def list_chat():
    msgs = await db.chat_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return msgs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
