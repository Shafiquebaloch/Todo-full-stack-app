from contextlib import asynccontextmanager # Import for lifespan
from fastapi import FastAPI
from sqlmodel import SQLModel
from fastapi.middleware.cors import CORSMiddleware
import os

# Change to absolute imports
from .database import engine
from .routers import tasks, auth 

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Only create tables if not in a test environment
    if os.getenv("TESTING") != "True":
        SQLModel.metadata.create_all(engine)
    yield
    # No cleanup needed here for the main app, as it's handled by Alembic migrations

app = FastAPI(lifespan=lifespan) # Use lifespan context manager

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(auth.router) # Include auth router

@app.get("/health")
def health_check():
    return {"status": "ok"}