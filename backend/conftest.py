import pytest
from sqlmodel import Session, SQLModel, create_engine
from fastapi.testclient import TestClient
from datetime import datetime, timedelta, timezone
from jose import jwt
import os

from backend.main import app
from backend import database # Import the database module to patch its engine
from backend.models import User, Task # Import your models
from backend.security import get_password_hash, ALGORITHM, SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES # Import security functions

# Use a separate in-memory SQLite database for testing, with check_same_thread=False
# Define a function to get a new test engine for each test run
def get_test_engine():
    return create_engine("sqlite:///:memory:", echo=False, connect_args={"check_same_thread": False})

@pytest.fixture(name="session")
def session_fixture():
    # Create a new engine for each test session to ensure isolation
    test_engine_instance = get_test_engine()
    SQLModel.metadata.create_all(test_engine_instance) # Create tables for this specific engine
    with Session(test_engine_instance) as session:
        yield session
    SQLModel.metadata.drop_all(test_engine_instance) # Drop tables for this specific engine

@pytest.fixture(name="client")
def client_fixture(session: Session): # Depends on session_fixture, ensuring tables are created
    # Ensure TESTING environment variable is set for conditional logic in main.py
    os.environ["TESTING"] = "True"

    # Temporarily override the app's database engine with the test engine
    original_database_engine = database.engine
    database.engine = session.bind # The engine from the current session fixture

    # Override get_session dependency for the app to use our test session
    def override_get_session():
        yield session

    app.dependency_overrides[database.get_session] = override_get_session

    with TestClient(app) as client:
        yield client # Yield the configured TestClient

    # Clean up after test
    app.dependency_overrides.clear()
    database.engine = original_database_engine # Restore original engine
    del os.environ["TESTING"] # Unset TESTING environment variable

@pytest.fixture(name="test_user")
def test_user_fixture(session: Session):
    email = "testuser@example.com"
    password = "testpassword"
    hashed_password = get_password_hash(password)
    user = User(email=email, hashed_password=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@pytest.fixture(name="auth_token")
def auth_token_fixture(test_user: User): # Depends on test_user
    # Manually create JWT token using the created test_user
    to_encode = {"sub": test_user.email}
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@pytest.fixture(name="authenticated_client")
def authenticated_client_fixture(client: TestClient, auth_token: str):
    # Modify the headers of the *existing* client fixture
    client.headers["Authorization"] = f"Bearer {auth_token}"
    yield client
    # Clean up the header after the test
    client.headers.pop("Authorization")