# Task Breakdown – Phase II: Todo Full-Stack Web Application (Multi-user)

This document breaks down the implementation of the Multi-User Todo Web Application into actionable tasks, organized by development phase and user story.

## Phase 1: Project Initialization & Setup
**Purpose**: Initialize the monorepo structure and configure backend/frontend projects.

- [X] T001 [P] Initialize a new Next.js application in the `frontend/` directory.
- [ ] T002 [P] Initialize a new FastAPI application in the `backend/` directory.
- [X] T003 [P] Create a `.env` file in `backend/` with `DATABASE_URL` and `JWT_SECRET` placeholders.
- [X] T004 [P] Create a `.env.local` file in `frontend/` with `NEXT_PUBLIC_API_BASE_URL` and `JWT_SECRET` placeholders.
- [ ] T005 [P] Configure linting and formatting tools for both Python and TypeScript projects.

## Phase 2: Foundational (Blocking Prerequisites)
**Purpose**: Set up core infrastructure required for all user stories.

- [X] T006 Setup database connection in `backend/src/database.py` to connect to Neon PostgreSQL.
- [X] T007 Implement the User and Task SQLModel models in `backend/src/models.py` based on `data-model.md`.
- [X] T008 Configure Alembic for database migrations in `backend/alembic/` and generate the initial migration.
- [X] T009 Implement JWT generation and verification logic in `backend/src/security.py`.
- [X] T010 Create a reusable dependency in `backend/src/dependencies.py` to get the current authenticated user from a JWT.
- [X] T011 [P] Set up a basic API client/service in `frontend/src/services/api.ts` to handle requests to the backend, including interceptors for adding the JWT.
- [X] T012 [P] Set up a simple state management solution (e.g., React Context) in `frontend/src/context/AuthContext.tsx` for managing authentication state.

---

## Phase 3: User Story 1 - Authentication (Signup & Signin) 🎯 MVP
**Goal**: Allow users to create an account and log in.
**Independent Test**: A new user can successfully register, then log in and receive an authentication token.

- [X] T013 [P] [US1] Create the `/api/v1/users/signup` endpoint in the backend for user registration.
- [X] T014 [P] [US1] Create the `/api/v1/users/login` endpoint in the backend to authenticate users and issue a JWT.
- [X] T015 [P] [US1] Create a signup page/component in `frontend/src/app/signup/page.tsx`.
- [X] T016 [P] [US1] Create a signin page/component in `frontend/src/app/signin/page.tsx`.
- [X] T017 [US1] Integrate the frontend signup form with the backend signup endpoint.
- [X] T018 [US1] Integrate the frontend signin form with the backend login endpoint, storing the received JWT.

---

## Phase 4: User Story 2 - Task Viewing & Creation
**Goal**: Allow authenticated users to see their tasks and create new ones.
**Independent Test**: A logged-in user sees an empty state, can create a new task, and sees it appear in their list. No other users' tasks are visible.

- [X] T019 [P] [US2] Create the `POST /api/v1/tasks` endpoint in the backend to create a new task for the authenticated user.
- [X] T020 [P] [US2] Create the `GET /api/v1/tasks` endpoint in the backend to list all tasks for the authenticated user.
- [X] T021 [P] [US2] Create the main task list page in `frontend/src/app/tasks/page.tsx`.
- [X] T022 [P] [US2] Implement a form component in the frontend to create a new task.
- [X] T023 [US2] Fetch and display the user's tasks on the main task page.
- [X] T024 [US2] Integrate the "create task" form to call the backend API and update the task list upon success.

---

## Phase 5: User Story 3 - Task Management (Update, Delete, Complete)
**Goal**: Allow users to manage their existing tasks.
**Independent Test**: A logged-in user can edit a task's title, delete a task, and toggle its completion status.

- [ ] T025 [P] [US3] Create the `PUT /api/v1/tasks/{task_id}` endpoint in the backend to update a task.
- [ ] T026 [P] [US3] Create the `DELETE /api/v1/tasks/{task_id}` endpoint in the backend to delete a task.
- [ ] T027 [P] [US3] Create the `PATCH /api/v1/tasks/{task_id}/complete` endpoint in the backend to toggle task completion.
- [ ] T028 [P] [US3] Implement UI controls on each task item in the frontend for editing, deleting, and marking as complete.
- [ ] T029 [US3] Connect the "edit" functionality to the `PUT` endpoint.
- [ ] T030 [US3] Connect the "delete" functionality to the `DELETE` endpoint.
- [ ] T031 [US3] Connect the "complete" toggle to the `PATCH` endpoint.

---

## Phase 6: Polish & Cross-Cutting Concerns
**Purpose**: Final improvements and documentation.

- [ ] T032 [P] Review and add basic error handling and user feedback for all API interactions in the frontend.
- [ ] T033 [P] Ensure all backend endpoints enforce ownership by checking that the task being accessed belongs to the authenticated user.
- [ ] T034 Write/update the `README.md` file with complete setup and run instructions.
- [ ] T035 [P] Perform a final review of the UI for responsiveness and consistency.

## Dependencies & Execution Order
- **Phase 1 (Setup)** must be completed first.
- **Phase 2 (Foundational)** depends on Phase 1. It is a prerequisite for all user story phases.
- **Phase 3 (US1 - Auth)** can begin after Phase 2.
- **Phase 4 (US2 - Tasks)** depends on Phase 3, as it requires an authenticated user.
- **Phase 5 (US3 - Management)** depends on Phase 4, as it requires tasks to exist.
- **Phase 6 (Polish)** is the final step.
