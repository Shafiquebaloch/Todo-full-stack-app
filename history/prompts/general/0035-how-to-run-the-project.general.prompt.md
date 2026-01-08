---
id: 0035
title: How to run the project
stage: general
date: 2026-01-02
surface: agent
model: gemini-1.5-pro
feature: Guest Mode
branch: main
user: UMAIR
command: how i can run my project
labels: ["project-management", "setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: []
tests_yaml: []
prompt_text: |
  how i can run my project
response_text: |
  To run your project (frontend and backend):

  **1. Run the Backend:**
  Open a terminal in the project's root directory (`C:\Users\UMAIR\Desktop\Todo-full-stack-app`) and execute:
  `uvicorn backend.main:app --reload --port 8000`
  This will start the backend API server on `http://localhost:8000`.

  **2. Run the Frontend:**
  Open another terminal, navigate to the `frontend` directory (`C:\Users\UMAIR\Desktop\Todo-full-stack-app\frontend`), and execute:
  `npm run dev`
  This will start the frontend development server, likely on `http://localhost:3000`, `http://localhost:3001`, or `http://localhost:3002` (if previous ports are in use).

  **3. Access the Application:**
  Once both are running, open your web browser and navigate to the frontend URL (e.g., `http://localhost:3002`).

  Remember to test the new Header-based authentication and Guest Mode functionality. You should see the auth controls in the top header, including a "Continue as Guest" button.
outcome: success
evaluation:
---
