# Todo Full-Stack App

This is a multi-user todo management system built with a modern web stack.

## Features

- User authentication (signup and signin)
- **Password Reset functionality (Forgot Password, Reset Password)**
- Create, read, update, and delete tasks
- Toggle task completion status
- Secure and private task management with strict data isolation

## Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+, SQLModel
- **Database**: PostgreSQL (via Neon)
- **Authentication**: JWT (HS256)

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL client libraries

### Setup

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Environment Variables**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```
    DATABASE_URL=<your-neon-postgresql-connection-string>
    BETTER_AUTH_SECRET=<your-jwt-secret> # Updated to align with Constitution Principle 3
    ```

    Create a `.env.local` file in the `frontend` directory and add the following variables:

    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
    ```

3.  **Backend Setup**

    ```bash
    cd backend
    pip install -r requirements.txt
    alembic upgrade head
    ```

4.  **Frontend Setup**

    ```bash
    cd frontend
    npm install
    ```

### Running the Application

1.  **Run the Backend**

    ```bash
    cd backend
    uvicorn main:app --reload
    ```

    The backend will be running at `http://localhost:8000`.

2.  **Run the Frontend**

    ```bash
    cd frontend
    npm run dev
    ```

    The frontend will be running at `http://localhost:3000`.

## Usage

### User Authentication
- **Sign Up**: Navigate to `/signup` to create a new account.
- **Sign In**: Navigate to `/signin` to log in with your credentials.
- **Forgot Password**: If you forget your password, navigate to `/forgot-password` to request a reset link. You'll receive a token (printed in the backend console for development) to reset your password at `/reset-password?token=<your_token>`.

### Task Management
- Once logged in, navigate to `/tasks`.
- **Create Tasks**: Use the input field and "Add Task" button.
- **View Tasks**: Your tasks will be listed on the `/tasks` page.
- **Update Tasks**: Click the "Edit" button on a task to modify it.
- **Delete Tasks**: Click the "Delete" button on a task.
- **Toggle Completion**: Click the checkbox next to a task to mark it as complete/incomplete.