import pytest
from sqlmodel import Session, SQLModel
from fastapi.testclient import TestClient
from datetime import datetime, timedelta, timezone
from jose import jwt
import os

from backend.main import app
from backend import database # Import the database module to patch its engine
from backend.models import User, Task # Import your models
from backend.security import get_password_hash, ALGORITHM, SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES # Import security functions
from backend.test_utils import create_db_and_tables, drop_db_and_tables # Import utility functions


@pytest.fixture(name="test_db_engine")
def test_db_engine_fixture():
    # Store the original engine
    original_engine = database.engine
    
    # Create a fresh test engine for each test session
    test_engine = database.create_db_engine("sqlite:///:memory:")
    
    # Patch the global engine in database.py
    database.engine = test_engine

    # Create tables for this specific engine
    create_db_and_tables(test_engine)
    
    yield test_engine
    
    # Drop tables and clear metadata
    drop_db_and_tables(test_engine)
    SQLModel.metadata.clear()
    
    # Restore the original engine
    database.engine = original_engine


@pytest.fixture(name="session")
def session_fixture(test_db_engine):
    with Session(test_db_engine) as session:
        yield session

@pytest.fixture(name="client")
def client_fixture(session: Session): # Depends on session_fixture, ensuring tables are created
    os.environ["TESTING"] = "True"

    # Override get_session dependency for the app to use our test session
    def override_get_session():
        yield session

    app.dependency_overrides[database.get_session] = override_get_session

    with TestClient(app) as client:
        yield client # Yield the configured TestClient

    # Clean up after test
    app.dependency_overrides.clear()
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