from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from .. import models
from ..database import get_session
from ..dependencies import get_current_user
from pydantic import BaseModel, constr

router = APIRouter(prefix="/tasks", tags=["Tasks"])


# Pydantic Models for Task data validation
class TaskCreate(BaseModel):
    title: constr(min_length=1, strip_whitespace=True)
    description: str | None = None


class TaskUpdate(BaseModel):
    title: constr(min_length=1, strip_whitespace=True) | None = None
    description: str | None = None
    completed: bool | None = None


@router.get("/", response_model=List[models.Task])
def read_tasks(
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    """
    Retrieve all tasks for the authenticated user.
    """
    tasks = session.exec(
        select(models.Task).where(models.Task.owner_id == current_user.id)
    ).all()
    return tasks


@router.post("/", response_model=models.Task, status_code=status.HTTP_201_CREATED)
def create_task(
    task: TaskCreate,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    """
    Create a new task for the authenticated user.
    """
    db_task = models.Task(
        title=task.title,
        description=task.description,
        owner_id=current_user.id
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.get("/{task_id}", response_model=models.Task)
def read_task(
    task_id: int,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    """
    Retrieve a specific task by ID.
    """
    task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )
    return task


@router.put("/{task_id}", response_model=models.Task)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    """
    Update a specific task.
    """
    db_task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    task_data = task_update.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)

    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    """
    Delete a specific task.
    """
    task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    session.delete(task)
    session.commit()
    return


@router.patch("/{task_id}/toggle", response_model=models.Task)
def toggle_task_completion(
    task_id: int,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user),
):
    """
    Toggle the completion status of a task.
    """
    task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    task.completed = not task.completed
    session.add(task)
    session.commit()
    session.refresh(task)
    return task