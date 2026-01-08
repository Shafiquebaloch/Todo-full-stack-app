---
id: 0008
title: Generate actionable task list for multi-user todo app
stage: tasks
date: 2026-01-05
surface: agent
model: gemini-1.5-flash-latest
feature: 003-multi-user-todo-app
branch: main
user: UMAIR
command: /sp.tasks
labels: ["task-generation", "planning", "feature-development"]
links:
  spec: specs/003-multi-user-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-multi-user-todo-app/tasks.md
tests: []
---

## Prompt

```text
---
description: Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.
handoffs:
  - label: Analyze For Consistency
    agent: sp.analyze
    prompt: Run a project analysis for consistency
    send: true
  - label: Implement Project
    agent: sp.implement
    prompt: Start the implementation in phases
    send: true
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/bash/check-prerequisites.sh --json` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load design documents**: Read from FEATURE_DIR:
   - **Required**: plan.md (tech stack, libraries, structure), spec.md (user stories with priorities)
   - **Optional**: data-model.md (entities), contracts/ (API endpoints), research.md (decisions), quickstart.md (test scenarios)
   - Note: Not all projects have all documents. Generate tasks based on what's available.

3. **Execute task generation workflow**:
   - Load plan.md and extract tech stack, libraries, project structure
   - Load spec.md and extract user stories with their priorities (P1, P2, P3, etc.)
   - If data-model.md exists: Extract entities and map to user stories
   - If contracts/ exists: Map endpoints to user stories
   - If research.md exists: Extract decisions for setup tasks
   - Generate tasks organized by user story (see Task Generation Rules below)
   - Generate dependency graph showing user story completion order
   - Create parallel execution examples per user story
   - Validate task completeness (each user story has all needed tasks, independently testable)

4. **Generate tasks.md**: Use `.specify/templates/tasks-template.md` as structure, fill with:
   - Correct feature name from plan.md
   - Phase 1: Setup tasks (project initialization)
   - Phase 2: Foundational tasks (blocking prerequisites for all user stories)
   - Phase 3+: One phase per user story (in priority order from spec.md)
   - Each phase includes: story goal, independent test criteria, tests (if requested), implementation tasks
   - Final Phase: Polish & cross-cutting concerns
   - All tasks must follow the strict checklist format (see Task Generation Rules below)
   - Clear file paths for each task
   - Dependencies section showing story completion order
   - Parallel execution examples per story
   - Implementation strategy section (MVP first, incremental delivery)

5. **Report**: Output path to generated tasks.md and summary:
   - Total task count
   - Task count per user story
   - Parallel opportunities identified
   - Independent test criteria for each story
   - Suggested MVP scope (typically just User Story 1)
   - Format validation: Confirm ALL tasks follow the checklist format (checkbox, ID, labels, file paths)

Context for task generation: # Task Breakdown – Phase II Todo Full-Stack Web Application (Multi-user) ## 1. Project Initialization & Setup (~30–40 min) 1.1 Create monorepo root folder and basic structure Target: hackathon-todo-web/ (backend/, frontend/, specs/) ~10 min 1.2 Initialize backend with UV + FastAPI skeleton Target: backend/main.py, backend/requirements.txt, backend/.env.example ~10 min 1.3 Initialize frontend with Next.js (App Router, TypeScript, Tailwind) Target: frontend/src/app/layout.tsx, page.tsx, package.json [P] parallel with 1.2 ~10–15 min ## 2. Database Schema & Connection (~45–60 min) 2.1 Define SQLModel models: User (id, email, username, hashed_password) & Task (id, title, description, completed, user_id) Target: backend/models.py Depends on 1.2 ~15 min 2.2 Setup database engine & session (sync + async) using .env DATABASE_URL Target: backend/database.py Depends on 2.1 ~15 min 2.3 Create script to initialize tables in Neon DB Target: backend/create_tables.py Depends on 2.2 ~15 min ## 3. Backend Auth & JWT (~60–75 min) 3.1 Implement password hashing & basic user CRUD Target: backend/routers/auth.py, dependencies/auth.py Depends on 2.1 ~20 min 3.2 Create JWT utilities (create_token, verify_token) Target: backend/dependencies/jwt.py Depends on 3.1 ~15 min 3.3 Add dependency to get current user from JWT Target: backend/dependencies/auth.py Depends on 3.2 ~15 min 3.4 Add signup & login endpoints (return JWT) Target: backend/routers/auth.py Depends on 3.3 ~10–15 min ## 4. Task CRUD API Endpoints (~60 min) 4.1 Create protected tasks router Target: backend/routers/tasks.py Depends on 3.3 ~10 min 4.2 Implement GET list tasks (only own) Target: backend/routers/tasks.py ~10 min 4.3 Implement POST create task Target: backend/routers/tasks.py ~10 min 4.4 Implement GET/PUT/DELETE/PATCH for single task (with ownership check) Target: backend/routers/tasks.py ~20 min 4.5 Add CORS middleware for frontend Target: backend/main.py ~10 min ## 5. Frontend Setup & Auth UI (~60–75 min) 5.1 Setup API client with token handling Target: frontend/src/lib/api.ts Depends on 4.5 ~15 min 5.2 Create Auth Context for user state & token Target: frontend/src/context/AuthContext.tsx ~15 min 5.3 Build login/signup form (email, password, username, Google/GitHub buttons) Target: frontend/src/components/AuthForm.tsx [P] parallel with 5.2 ~20 min 5.4 Add header with Sign Up / Sign In / Guest + dark mode toggle Target: frontend/src/components/Header.tsx ~10 min ## 6. Task List & CRUD UI (~90–120 min) 6.1 Create TaskCard component (title, desc, priority, due date, complete checkbox) Target: frontend/src/components/TaskCard.tsx ~15 min 6.2 Build dashboard page with task list, search bar, sort dropdown Target: frontend/src/app/dashboard/page.tsx Depends on 6.1 ~20 min 6.3 Create task form (priority dropdown, due date picker, tags input) Target: frontend/src/components/TaskForm.tsx ~20 min 6.4 Add edit/delete + toast notifications Target: frontend/src/components/TaskActions.tsx ~15 min 6.5 Implement dark mode toggle & theme provider Target: frontend/src/components/ThemeToggle.tsx [P] parallel ~20 min ## 7. UI Enhancements (~45–60 min) 7.1 Implement toast/popup for CRUD success/error Target: frontend/src/components/Toast.tsx ~15 min 7.2 Add welcome message after login ("Welcome back, [Username]!") Target: frontend/src/components/WelcomeMessage.tsx ~10 min 7.3 Add task export (CSV/PDF) button Target: frontend/src/components/ExportTasks.tsx ~20 min ## 8. Testing & Validation (~60 min) 8.1 Backend tests for auth & task endpoints Target: backend/tests/ ~20 min 8.2 Frontend tests for auth & task components Target: frontend/src/__tests__/ ~20 min 8.3 Manual test: signup → create task → list → logout → guest mode ~20 min ## 9. Final Polish & Documentation (~30–45 min) 9.1 Update README with setup/run instructions Target: README.md ~10 min 9.2 Add CLAUDE.md with prompts used Target: CLAUDE.md ~10 min 9.3 Final visual polish: colors, icons, responsive checks ~10–15 min Total estimated time: ~6–9 hours (with fast AI generation)

The tasks.md should be immediately executable - each task must be specific enough that an LLM can complete it without additional context.

## Task Generation Rules

**CRITICAL**: Tasks MUST be organized by user story to enable independent implementation and testing.

**Tests are OPTIONAL**: Only generate test tasks if explicitly requested in the feature specification or if user requests TDD approach.

### Checklist Format (REQUIRED)

Every task MUST strictly follow this format:

```text
- [ ] [TaskID] [P?] [Story?] Description with file path
```

**Format Components**:

1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2. **Task ID**: Sequential number (T001, T002, T003...) in execution order
3. **[P] marker**: Include ONLY if task is parallelizable (different files, no dependencies on incomplete tasks)
4. **[Story] label**: REQUIRED for user story phase tasks only
   - Format: [US1], [US2], [US3], etc. (maps to user stories from spec.md)
   - Setup phase: NO story label
   - Foundational phase: NO story label  
   - User Story phases: MUST have story label
   - Polish phase: NO story label
5. **Description**: Clear action with exact file path

**Examples**:

- ✅ CORRECT: `- [ ] T001 Create project structure per implementation plan`
- ✅ CORRECT: `- [ ] T005 [P] Implement authentication middleware in src/middleware/auth.py`
- ✅ CORRECT: `- [ ] T012 [P] [US1] Create User model in src/models/user.py`
- ✅ CORRECT: `- [ ] T014 [US1] Implement UserService in src/services/user_service.py`
- ❌ WRONG: `- [ ] Create User model` (missing ID and Story label)
- ❌ WRONG: `T001 [US1] Create model` (missing checkbox)
- ❌ WRONG: `- [ ] [US1] Create User model` (missing Task ID)
- ❌ WRONG: `- [ ] T001 [US1] Create model` (missing file path)

### Task Organization

1. **From User Stories (spec.md)** - PRIMARY ORGANIZATION:
   - Each user story (P1, P2, P3...) gets its own phase
   - Map all related components to their story:
     - Models needed for that story
     - Services needed for that story
     - Endpoints/UI needed for that story
     - If tests requested: Tests specific to that story
   - Mark story dependencies (most stories should be independent)

2. **From Contracts**:
   - Map each contract/endpoint → to the user story it serves
   - If tests requested: Each contract → contract test task [P] before implementation in that story's phase

3. **From Data Model**:
   - Map each entity to the user story(ies) that need it
   - If entity serves multiple stories: Put in earliest story or Setup phase
   - Relationships → service layer tasks in appropriate story phase

4. **From Setup/Infrastructure**:
   - Shared infrastructure → Setup phase (Phase 1)
   - Foundational/blocking tasks → Foundational phase (Phase 2)
   - Story-specific setup → within that story's phase

### Phase Structure

- **Phase 1**: Setup (project initialization)
- **Phase 2**: Foundational (blocking prerequisites - MUST complete before user stories)
- **Phase 3+**: User Stories in priority order (P1, P2, P3...)
  - Within each story: Tests (if requested) → Models → Services → Endpoints → Integration
  - Each phase should be a complete, independently testable increment
- **Final Phase**: Polish & Cross-Cutting Concerns

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.

```

## Response snapshot

Generated new `tasks.md` for the feature located at `specs/003-multi-user-todo-app/tasks.md`. The tasks are organized into phases, with specific tasks for User Signup, Signin, Task Management (CRUD), and a new phase for Password Reset, addressing the `H1` underspecification found during analysis. Testing tasks (T019-T021 from previous version) are intentionally omitted due to the user's explicit instruction to ignore testing for now.

Summary:
- Total task count: 33
- Task count per user story:
    - Setup: 3
    - User Story 1 (Signup): 4
    - User Story 2 (Signin): 5
    - User Story 3 & 4 (Task Management): 12
    - User Story 5 (Password Reset): 6
    - Polish & Cross-Cutting Concerns: 3
- Parallel opportunities identified: Tasks T001-T003 are parallel. Within phases, frontend and backend tasks can be parallelized after API contracts are defined.
- Independent test criteria for each story: Derived from `spec.md` for each user story.
- Suggested MVP scope: Phase 2 (Foundational - User Signup & Signin) and Phase 3 (Task Management CRUD).
- Format validation: All tasks follow the required checklist format.

## Outcome

- ✅ Impact: A new, actionable, and dependency-ordered `tasks.md` has been generated, incorporating previously underspecified functional requirements and reflecting current development priorities (e.g., deferring comprehensive testing).
- 🧪 Tests: Testing tasks (T019, T020 from previous `tasks.md`) are explicitly excluded from this generated `tasks.md` as per user instructions.
- 📁 Files: `specs/003-multi-user-todo-app/tasks.md` was overwritten.
- 🔁 Next prompts: The next logical step is to begin implementing the tasks in the newly generated `tasks.md` using the `/sp.implement` command, starting with Phase 1.
- 🧠 Reflection: Successfully addressed the `H1` underspecification by creating a new User Story and associated tasks for Password Reset. The regeneration process ensures that the task list aligns with the updated understanding of the specification and current development directives.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Start implementing the tasks from the new `tasks.md`.