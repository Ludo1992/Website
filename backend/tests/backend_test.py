"""Backend tests for L.A. Technische Service API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://game-archive-11.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("message") == "L.A. Technische Service API"


# ---------- Contact ----------
def test_contact_create_valid(client):
    payload = {
        "name": "TEST_Jan Janssen",
        "email": "test_jan@example.com",
        "subject": "Storing aan productielijn",
        "message": "We hebben een storing aan onze productielijn, graag contact.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["subject"] == payload["subject"]
    assert data["message"] == payload["message"]
    assert "_id" not in data


def test_contact_invalid_email(client):
    payload = {
        "name": "TEST_Test User",
        "email": "not-an-email",
        "subject": "Onderwerp",
        "message": "Hallo dit is een testbericht.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_contact_too_short(client):
    payload = {"name": "A", "email": "ok@example.com", "subject": "X", "message": "hi"}
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_contact_list(client):
    r = client.get(f"{API}/contact")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    for item in data:
        assert "_id" not in item
        assert "id" in item
        assert "email" in item
