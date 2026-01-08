from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from .. import models
from ..database import get_session
from ..dependencies import get_current_user

router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["tasks"],
    dependencies=[Depends(get_current_user)],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[models.Task])
def read_tasks(
    *,
    session: Session = Depends(get_session),
    current_user: models.User = Depends(get_current_user)
):
    tasks = session.exec(select(models.Task).where(models.Task.owner_id == current_user.id)).all()
    return tasks

@router.post("/", response_model=models.Task)
def create_task(
    *,
    session: Session = Depends(get_session),
    task: models.Task, # Expects title, description, completed
    current_user: models.User = Depends(get_current_user)
):
    if not task.title:
        raise HTTPException(status_code=400, detail="Task title cannot be empty")
        
    db_task = models.Task.model_validate(task, update={"owner_id": current_user.id}) # Ensure owner_id is set
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.get("/{task_id}", response_model=models.Task)
def read_task(
    *,
    session: Session = Depends(get_session),
    task_id: int,
    current_user: models.User = Depends(get_current_user)
):
    task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or you don't have permission to access it")
    return task

@router.put("/{task_id}", response_model=models.Task)
def update_task(
    *,
    session: Session = Depends(get_session),
    task_id: int,
    task: models.Task,
    current_user: models.User = Depends(get_current_user)
):
    db_task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found or you don't have permission to access it")

    if not task.title:
        raise HTTPException(status_code=400, detail="Task title cannot be empty")

    task_data = task.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(
    *,
    session: Session = Depends(get_session),
    task_id: int,
    current_user: models.User = Depends(get_current_user)
):
    task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or you don't have permission to delete it")
    
    session.delete(task)
    session.commit()
    return {"ok": True}

@router.patch("/{task_id}/complete", response_model=models.Task)
def toggle_task_completion(
    *,
    session: Session = Depends(get_session),
    task_id: int,
    current_user: models.User = Depends(get_current_user)
):
    task = session.exec(
        select(models.Task)
        .where(models.Task.id == task_id)
        .where(models.Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or you don't have permission to modify it")

    task.completed = not task.completed
    session.add(task)
    session.commit()
    session.refresh(task)
    return task