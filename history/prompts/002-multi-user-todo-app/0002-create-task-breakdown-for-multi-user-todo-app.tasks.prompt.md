---
id: 0002
title: Create Task Breakdown for Multi-User Todo App
stage: tasks
date: 2026-01-02
surface: agent
model: gemini-1.5-pro-001
feature: 002-multi-user-todo-app
branch: 002-multi-user-todo-app
user: {{USER}}
command: /sp.tasks
labels: [tasks, feature]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-multi-user-todo-app/tasks.md
tests:
 - none
---

## Prompt

/sp.tasks Context for task generation: You are an expert technical project manager specializing in Spec-Driven Development (Claude Code + Spec-Kit Plus workflow). Create a detailed **Task Breakdown document** (Markdown format) for **Phase II: Todo Full-Stack Web Application** — a completely separate, independent multi-user web project (NOT connected to the previous console app). Project folder: hackathon-todo-web/ Must strictly follow: - Phase II Constitution - Phase II Specification - Technical Plan / Architecture (already created) Focus areas: - Monorepo with frontend/ (Next.js) and backend/ (FastAPI) - Neon PostgreSQL database - Better Auth + JWT authentication - Strong user/task ownership enforcement - REST API with exact endpoints Task characteristics: - Group tasks logically (Setup, Database, Backend, Authentication, Frontend, Testing, etc.) - Number them (1., 1.1, 1.2, ...) - Mark parallelizable tasks with [P] if applicable - Include rough time estimate (~15 min, ~30 min, etc.) - Specify target file/folder for each task - Make tasks small enough for one good Claude Code generation pass - Include dependency notes (e.g. "Depends on Task 1.2") - End with integration + testing tasks Structure exactly like this: # Task Breakdown – Phase II Todo Full-Stack Web Application (Multi-user) ## 1. Project Initialization & Setup ## 2. Database Schema & Connection ## 3. Backend Core Setup (FastAPI) ## 4. Authentication & JWT Middleware ## 5. Task CRUD API Endpoints ## 6. Frontend Setup (Next.js) ## 7. Authentication UI (Signup / Signin) ## 8. Task UI & API Integration (Frontend) ## 9. Security & Ownership Enforcement Checks ## 10. Testing & Validation ## 11. Final Polish & Documentation Tone: precise, actionable, developer-friendly No code — only clear task descriptions with file paths and dependencies Begin writing the complete task breakdown now.

## Response snapshot

Created the task breakdown for the 'Multi-User Todo Web Application'. The tasks are located at `specs/002-multi-user-todo-app/tasks.md`.

## Outcome

- ✅ Impact: {{OUTCOME_IMPACT}}
- 🧪 Tests: {{TESTS_SUMMARY}}
- 📁 Files: {{FILES_SUMMARY}}
- 🔁 Next prompts: {{NEXT_PROMPTS}}
- 🧠 Reflection: {{REFLECTION_NOTE}}

## Evaluation notes (flywheel)

- Failure modes observed: {{FAILURE_MODES}}
- Graders run and results (PASS/FAIL): {{GRADER_RESULTS}}
- Prompt variant (if applicable): {{PROMPT_VARIANT_ID}}
- Next experiment (smallest change to try): {{NEXT_EXPERIMENT}}