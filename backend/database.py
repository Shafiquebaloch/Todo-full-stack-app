import os
from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

def create_db_engine(database_url: str | None = None):
    """
    Creates a new SQLAlchemy engine.
    If database_url is provided, it uses that, otherwise it defaults to DATABASE_URL env var.
    """
    if database_url is None:
        database_url = os.getenv("DATABASE_URL")
    
    if database_url is None:
        raise ValueError("DATABASE_URL environment variable is not set")

    # For SQLite in-memory, check_same_thread needs to be False for some async operations
    connect_args = {}
    if "sqlite" in database_url:
        connect_args["check_same_thread"] = False
        
    return create_engine(database_url, echo=False, connect_args=connect_args)

engine = create_db_engine()

def get_session():
    with Session(engine) as session:
        yield session
