import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

db_url = os.getenv("DATABASE_URL")

if not db_url:
    print("DATABASE_URL environment variable is not set.")
else:
    try:
        conn = psycopg2.connect(db_url)
        print("Database connection successful!")
        conn.close()
    except psycopg2.OperationalError as e:
        print(f"Database connection failed: {e}")
