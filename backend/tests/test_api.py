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

    def test_health_email_not_configured(self, client):
        r = client.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert data.get("email_configured") is False


# ----- Contact (inquiries) -----
class TestContact:
    def test_create_inquiry_valid(self, client):
        payload = {
            "name": "TEST_Alice",
            "email": "TEST_alice@example.com",
            "company": "TEST_Co",
            "tier": "Multi page",
            "budget": "30000",
            "message": "We need a multi-page marketing site.",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["email_sent"] is False
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["tier"] == payload["tier"]
        assert "_id" not in data
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
