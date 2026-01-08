import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from backend.models import User
from backend.security import get_password_hash

# Note: The client and session fixtures are provided by conftest.py

def test_signup_user(client: TestClient):
    response = client.post(
        "/api/v1/auth/signup",
        json={"email": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "hashed_password" not in data # Should not return hashed password

def test_signup_existing_user(client: TestClient):
    # First signup
    client.post(
        "/api/v1/auth/signup",
        json={"email": "test@example.com", "password": "password123"}
    )
    # Try to signup again with same email
    response = client.post(
        "/api/v1/auth/signup",
        json={"email": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Email already registered"}

def test_login_for_access_token(client: TestClient):
    # Signup a user first
    client.post(
        "/api/v1/auth/signup",
        json={"email": "test@example.com", "password": "password123"}
    )
    # Then login
    response = client.post(
        "/api/v1/auth/token",
        data={"username": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials(client: TestClient):
    response = client.post(
        "/api/v1/auth/token",
        data={"username": "nonexistent@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect username or password"}

def test_login_incorrect_password(client: TestClient):
    client.post(
        "/api/v1/auth/signup",
        json={"email": "test@example.com", "password": "password123"}
    )
    response = client.post(
        "/api/v1/auth/token",
        data={"username": "test@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect username or password"}
