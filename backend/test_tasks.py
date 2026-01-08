import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session
from backend.models import Task

# Note: client, session, auth_token, and authenticated_client fixtures are provided by conftest.py

def test_create_task(authenticated_client: TestClient):
    response = authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Test Task", "description": "This is a test task."}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["description"] == "This is a test task."
    assert "id" in data
    assert "owner_id" in data
    assert data["completed"] is False

def test_create_task_empty_title(authenticated_client: TestClient):
    response = authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "", "description": "This task has an empty title."}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Task title cannot be empty"}

def test_read_tasks(authenticated_client: TestClient):
    # Create a task first
    authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Task 1", "description": "Desc 1"}
    )
    authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Task 2", "description": "Desc 2"}
    )

    response = authenticated_client.get("/api/v1/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 2
    assert data[0]["title"] == "Task 1"
    assert data[1]["title"] == "Task 2"

def test_read_single_task(authenticated_client: TestClient):
    # Create a task
    create_response = authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Single Task", "description": "Details for single task"}
    )
    task_id = create_response.json()["id"]

    response = authenticated_client.get(f"/api/v1/tasks/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Single Task"
    assert data["id"] == task_id

def test_read_nonexistent_task(authenticated_client: TestClient):
    response = authenticated_client.get("/api/v1/tasks/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found or you don't have permission to access it"}

def test_update_task(authenticated_client: TestClient):
    # Create a task
    create_response = authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Original Task", "description": "Original Description"}
    )
    task_id = create_response.json()["id"]

    update_response = authenticated_client.put(
        f"/api/v1/tasks/{task_id}",
        json={"title": "Updated Task", "description": "Updated Description", "completed": True}
    )
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["title"] == "Updated Task"
    assert data["description"] == "Updated Description"
    assert data["completed"] is True
    assert data["id"] == task_id

def test_update_nonexistent_task(authenticated_client: TestClient):
    response = authenticated_client.put(
        "/api/v1/tasks/999",
        json={"title": "Non Existent", "description": "Desc"}
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found or you don't have permission to access it"}

def test_update_task_empty_title(authenticated_client: TestClient):
    # Create a task
    create_response = authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Original Task", "description": "Original Description"}
    )
    task_id = create_response.json()["id"]

    update_response = authenticated_client.put(
        f"/api/v1/tasks/{task_id}",
        json={"title": "", "description": "Updated Description", "completed": True}
    )
    assert update_response.status_code == 400
    assert update_response.json() == {"detail": "Task title cannot be empty"}


def test_delete_task(authenticated_client: TestClient):
    # Create a task
    create_response = authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Task to Delete", "description": "This will be deleted"}
    )
    task_id = create_response.json()["id"]

    response = authenticated_client.delete(f"/api/v1/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json() == {"ok": True}

    # Verify it's deleted
    get_response = authenticated_client.get(f"/api/v1/tasks/{task_id}")
    assert get_response.status_code == 404

def test_delete_nonexistent_task(authenticated_client: TestClient):
    response = authenticated_client.delete("/api/v1/tasks/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found or you don't have permission to delete it"}

def test_toggle_task_completion(authenticated_client: TestClient):
    # Create a task
    create_response = authenticated_client.post(
        "/api/v1/tasks/",
        json={"title": "Toggle Me", "description": "Initially not complete"}
    )
    task_id = create_response.json()["id"]

    # Toggle to complete
    toggle_response = authenticated_client.patch(f"/api/v1/tasks/{task_id}/complete")
    assert toggle_response.status_code == 200
    data = toggle_response.json()
    assert data["completed"] is True

    # Toggle back to incomplete
    toggle_response = authenticated_client.patch(f"/api/v1/tasks/{task_id}/complete")
    assert toggle_response.status_code == 200
    data = toggle_response.json()
    assert data["completed"] is False


def test_toggle_nonexistent_task(authenticated_client: TestClient):
    response = authenticated_client.patch("/api/v1/tasks/999/complete")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found or you don't have permission to modify it"}


# Test for user isolation - tasks
def test_tasks_user_isolation(client: TestClient): # Use the regular client here
    # User 1 signs up and creates a task
    client.post(
        "/api/v1/auth/signup",
        json={"email": "user1@example.com", "password": "password123"}
    )
    response_user1_login = client.post(
        "/api/v1/auth/token",
        data={"username": "user1@example.com", "password": "password123"}
    )
    token_user1 = response_user1_login.json()["access_token"]

    # User 1 creates task
    client.headers["Authorization"] = f"Bearer {token_user1}"
    create_response_user1 = client.post(
        "/api/v1/tasks/",
        json={"title": "User1's Exclusive Task", "description": "Only user1 can see this"}
    )
    task_id_user1 = create_response_user1.json()["id"]

    # User 2 signs up and creates a task
    client.post(
        "/api/v1/auth/signup",
        json={"email": "user2@example.com", "password": "password123"}
    )
    response_user2_login = client.post(
        "/api/v1/auth/token",
        data={"username": "user2@example.com", "password": "password123"}
    )
    token_user2 = response_user2_login.json()["access_token"]

    # Clear User1's token and set User2's token to client
    client.headers.pop("Authorization")
    client.headers["Authorization"] = f"Bearer {token_user2}"

    # User 2 tries to read User1's tasks
    response_user2_tasks = client.get("/api/v1/tasks/")
    assert response_user2_tasks.status_code == 200
    assert len(response_user2_tasks.json()) == 0 # User2 should have no tasks by default

    # User 2 tries to read User1's specific task by ID
    response_user2_access_user1_task = client.get(f"/api/v1/tasks/{task_id_user1}")
    assert response_user2_access_user1_task.status_code == 404
    assert response_user2_access_user1_task.json() == {"detail": "Task not found or you don't have permission to access it"}

    client.headers.pop("Authorization") # Clean up for subsequent tests