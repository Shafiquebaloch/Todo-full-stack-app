from typing import List, Optional
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel

class UserBase(SQLModel):
    email: str

class UserPublic(UserBase):
    id: int

class UserCreate(UserBase):
    password: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

    # New fields for password reset
    password_reset_token: Optional[str] = Field(default=None, index=True)
    password_reset_expires: Optional[datetime] = Field(default=None)

    tasks: List["Task"] = Relationship(back_populates="owner")

from sqlalchemy import Column, DateTime
from sqlalchemy.sql import func

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: Optional[str] = Field(default=None, index=True)
    completed: bool = Field(default=False)
    
    created_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    updated_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), onupdate=func.now())
    )
    
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    owner: Optional[User] = Relationship(back_populates="tasks")
