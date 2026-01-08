# Quickstart Guide: Multi-user Todo Management System

This guide provides instructions for setting up and running the project locally.

## 1. Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL client libraries

## 2. Setup

### 2.1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2.2. Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```
DATABASE_URL=<your-neon-postgresql-connection-string>
BETTER_AUTH_SECRET=<your-jwt-secret>
```

Create a `.env.local` file in the `frontend` directory and add the following variables:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_SECRET=<your-jwt-secret>
```

**Note**: The `BETTER_AUTH_SECRET` must be the same in both the frontend and backend.

### 2.3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
```

### 2.4. Frontend Setup

```bash
cd frontend
npm install
```

## 3. Running the Application

### 3.1. Run the Backend

```bash
cd backend
uvicorn main:app --reload
```

The backend will be running at `http://localhost:8000`.

### 3.2. Run the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be running at `http://localhost:3000`.
