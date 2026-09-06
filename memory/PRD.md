# Aura Retouch — Product Requirements Document

## Original Problem Statement
Landing page for a photo editing service targeting wedding & portrait photographers.
Sections: Hero + floating enquiry box, interactive Before/After portfolio, About/Story,
Roadmap (How It Works, 4 steps), Contact form + FAQ, floating live chatbox, pricing table
(Basic $100, Basic Plus $140, Standard $250, Premium $450, Custom).

## User Choices
- Contact form + enquiry box → send to email (Emergent-managed Resend).
- Live chatbox → simple form-style widget that saves messages.
- Brand name → placeholder ("Aura Retouch").
- Style → elegant, editorial, bright, luxury, trustworthy.
- Portfolio photos → placeholders (stock) until user provides their own.
- Added: per-plan "Choose" button emails owner when a photographer selects a pricing plan.

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui, framer-motion (scroll reveals, hero masked
  line reveal, parallax), lenis (smooth scroll), react-fast-marquee (editorial ribbon).
  Single page `src/pages/Landing.jsx` composed of `src/components/site/*`.
- Backend: FastAPI + MongoDB. Email via Emergent managed Resend proxy.
- Collections: enquiries, contacts, chat_messages, plan_selections.

## Implemented (2026-06)
- Kinetic hero with masked line-by-line reveal + parallax + floating enquiry box → POST /api/enquiry (emails owner).
- Before/After drag sliders in portfolio.
- About/Story with stats + parallax image.
- Roadmap: 4 numbered steps.
- Editorial marquee ribbon.
- Pricing 5-tier table (desktop) + cards (mobile) with per-plan Choose dialog → POST /api/plan-selection (emails owner).
- Contact form (Name/Email/Purpose/Message) → POST /api/contact (emails owner). FAQ accordion.
- Floating chat widget → POST /api/chat (saves to DB).
- Sticky glass nav, footer.

## Email note (P0 before production)
- OWNER_EMAIL / EMAIL_REPLY_TO in /app/backend/.env are PLACEHOLDER `delivered@resend.dev`.
  Replace with the real studio inbox, then `sudo supervisorctl restart backend`.

## Backlog
- P1: Admin view to browse saved enquiries/contacts/chat/plan selections.
- P1: Replace stock portfolio images with real client before/after pairs.
- P2: Testimonials, blog, real secure RAW upload flow.
