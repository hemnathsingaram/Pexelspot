"""Backend API tests for Pexel Spot landing page endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://photographer-relief.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
def test_root(api_client):
    r = api_client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# ---- Plan selection ----
class TestPlanSelection:
    def test_remedial_plan_submission(self, api_client):
        payload = {
            "plan": "Remedial",
            "price": "$50",
            "name": "TEST_Remedial Buyer",
            "email": "test_remedial@example.com",
            "phone": "+15551234567",
            "studio": "TEST Studio",
            "message": "Interested in the Remedial pre-basic tier",
        }
        r = api_client.post(f"{API}/plan-selection", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "success"
        assert "id" in data

    def test_plan_requires_email(self, api_client):
        r = api_client.post(f"{API}/plan-selection", json={
            "plan": "Basic", "price": "$100", "name": "X"
        })
        assert r.status_code == 422

    def test_plan_invalid_email(self, api_client):
        r = api_client.post(f"{API}/plan-selection", json={
            "plan": "Basic", "price": "$100", "name": "X", "email": "not-an-email"
        })
        assert r.status_code == 422


# ---- Contact ----
class TestContact:
    def test_contact_submission(self, api_client):
        payload = {
            "name": "TEST_Contact Person",
            "email": "test_contact@example.com",
            "phone": "+15559998888",
            "studio": "TEST Photo Co",
            "purpose": "General Inquiry",
            "message": "Automated test submission",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "success"
        assert "id" in data

    def test_contact_requires_purpose(self, api_client):
        r = api_client.post(f"{API}/contact", json={
            "name": "X", "email": "x@test.com"
        })
        assert r.status_code == 422
