import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback: read from frontend/.env directly
    from pathlib import Path
    fe_env = Path("/app/frontend/.env").read_text().splitlines()
    for line in fe_env:
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- Health / root -----
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "Z-Digital" in data.get("message", "")

    def test_health_email_configured(self, client):
        r = client.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        # RESEND_API_KEY and NOTIFY_EMAIL are set in backend/.env for this iteration
        assert data.get("email_configured") is True


# ----- Contact (inquiries) -----
class TestContact:
    def test_create_inquiry_valid_with_new_fields(self, client):
        payload = {
            "name": "TEST_Alice",
            "email": "TEST_alice@example.com",
            "company": "TEST_Co",
            "service": "Website",
            "tier": "Multi Page",
            "budget": "₹30,000",
            "message": "We need a multi-page marketing site.",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        # Echo check for new fields
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["service"] == payload["service"]
        assert data["tier"] == payload["tier"]
        assert data["budget"] == payload["budget"]
        # Resend is configured → backend should return email_sent=true if the Resend
        # API accepts the call. We do not hard-fail on email delivery though.
        assert isinstance(data["email_sent"], bool)
        assert "_id" not in data

    def test_create_inquiry_brand_identity(self, client):
        payload = {
            "name": "TEST_Brand",
            "email": "TEST_brand@example.com",
            "service": "Brand Identity",
            "tier": "Professional Brand",
            "budget": "₹50,000",
            "message": "Need a full brand identity package for my clinic.",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["service"] == "Brand Identity"
        assert data["tier"] == "Professional Brand"
        assert data["budget"] == "₹50,000"

    def test_create_inquiry_minimal(self, client):
        # service/tier/budget are optional
        payload = {
            "name": "TEST_Min",
            "email": "TEST_min@example.com",
            "message": "Minimal payload — no service/tier/budget.",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["service"] is None
        assert data["tier"] is None
        assert data["budget"] is None
        # persistence check via GET list
        r2 = client.get(f"{BASE_URL}/api/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert any(it["id"] == data["id"] for it in items)

    def test_invalid_email_returns_422(self, client):
        payload = {
            "name": "TEST_Bob",
            "email": "not-an-email",
            "message": "hi",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_empty_message_returns_422(self, client):
        payload = {
            "name": "TEST_Bob",
            "email": "TEST_bob@example.com",
            "message": "",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_list_inquiries_no_id_leak_and_sorted(self, client):
        # seed two
        for i in range(2):
            client.post(f"{BASE_URL}/api/contact", json={
                "name": f"TEST_sort_{i}",
                "email": f"TEST_sort_{i}@example.com",
                "message": f"msg {i}",
            })
        r = client.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list) and len(items) >= 2
        for it in items:
            assert "_id" not in it
            assert "id" in it
        # newest first: created_at descending
        timestamps = [it["created_at"] for it in items]
        assert timestamps == sorted(timestamps, reverse=True)


# ----- Status (ObjectId leak check) -----
class TestStatus:
    def test_status_no_id_leak(self, client):
        r = client.post(f"{BASE_URL}/api/status", json={"client_name": "TEST_status"})
        assert r.status_code == 200
        assert "_id" not in r.json()
        r2 = client.get(f"{BASE_URL}/api/status")
        assert r2.status_code == 200
        for it in r2.json():
            assert "_id" not in it
