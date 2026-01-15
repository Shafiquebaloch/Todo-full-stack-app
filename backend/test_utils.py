from sqlmodel import SQLModel
from backend import models # Ensure models are imported

def create_db_and_tables(engine):
    """
    Creates all database tables based on SQLModel metadata.
    Ensures all models are loaded before calling create_all.
    """
    # Force import of models to ensure they are registered with SQLModel.metadata
    # This is often needed in testing contexts where modules might be loaded lazily
    import sys
    if "backend.models" not in sys.modules:
        import backend.models
    
    SQLModel.metadata.create_all(engine)

def drop_db_and_tables(engine):
    """
    Drops all database tables based on SQLModel metadata.
    """
    SQLModel.metadata.drop_all(engine)
