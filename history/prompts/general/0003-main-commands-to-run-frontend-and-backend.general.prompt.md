---
id: 0003
title: Main commands to run frontend and backend
stage: general
date: 2026-01-02
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: UMAIR
command: what are main commonds to run the frontend and backend both
labels: ["project-management"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: []
tests_yaml: []
prompt_text: |
  what are main commonds to run the frontend and backend both
response_text: |
  To run the backend, navigate to the `backend` directory and execute:
  `uvicorn main:app --reload --port 8000`

  To run the frontend, navigate to the `frontend` directory and execute:
  `npm run dev`
outcome: success
evaluation:
---
