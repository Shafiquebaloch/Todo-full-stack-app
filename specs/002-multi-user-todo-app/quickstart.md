# Quickstart: Multi-User Todo Web Application

This guide provides the basic steps to get the application running locally for development.

## Prerequisites
- Node.js and npm/yarn for the frontend.
- Python and pip for the backend.
- A running PostgreSQL instance (or a Neon account).

## Environment Variables
Create a `.env` file in the root of the `backend` directory with the following variables:

```
DATABASE_URL="your_neon_db_connection_string"
JWT_SECRET="a_very_secret_key"
```

Create a `.env.local` file in the root of the `frontend` directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
JWT_SECRET="a_very_secret_key"
```

**IMPORTANT**: The `JWT_SECRET` must be identical in both the frontend and backend.

## Backend Setup
1. Navigate to the `backend` directory.
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Run the backend server: `uvicorn main:app --reload`

The backend will be available at `http://localhost:8000`.

## Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install` (or `yarn install`)
3. Run the frontend development server: `npm run dev` (or `yarn dev`)

The frontend will be available at `http://localhost:3000`.

## Running the Application
Once both the frontend and backend servers are running, you can access the application by navigating to `http://localhost:3000` in your web browser.
