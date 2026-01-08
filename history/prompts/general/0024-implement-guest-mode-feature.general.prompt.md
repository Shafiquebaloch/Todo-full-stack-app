--- 
id: 0023
title: Implement Guest Mode Feature
stage: general
date: 2026-01-02
surface: agent
model: gemini-1.5-pro
feature: Guest Mode
branch: main
user: UMAIR
command: /sp.implement You are an expert full-stack developer using strict Spec-Driven Development (Spec-Kit Plus workflow).

Update the existing Phase II: Todo Full-Stack Web Application implementation to add Guest Mode.

Important Rules:
- Do NOT change or break any existing functionality (JWT auth, user ownership, API endpoints, database models, frontend pages, etc.).
- Keep the current structure exactly the same: frontend/ (Next.js App Router), backend/ (FastAPI + SQLModel), Neon PostgreSQL.
- Only add Guest Mode: If a user does NOT want to sign up or sign in, immediately allow access as a guest.
- Guest users get a temporary ID (e.g. "guest_" + random 6-digit number or UUID).
- Guests can fully use the app: create, read, update, delete their own tasks.
- Guest data is stored in the database under their guest ID (isolated from real users).
- Real users can still sign up/sign in normally (no change).
- Add a clear "Continue as Guest" button on the login/signup page.

Do this step-by-step automatically (no permission needed):
1. Update frontend login page (frontend/src/app/login/page.tsx or similar) to add "Continue as Guest" button.
2. When clicked, generate guest ID, store in localStorage/sessionStorage, and redirect to dashboard/tasks page.
3. Update backend auth middleware to accept missing/invalid token as guest (return guest ID).
4. Ensure all task operations filter by current_user_id (works for both real users and guests).
5. Add simple guest cleanup (optional: expire after 24h or browser close).

Generate/update files in this format:

=== frontend/src/app/login/page.tsx ===
[updated full code]

=== backend/auth.py ===
[updated auth functions]

=== backend/routers/tasks.py ===
[any small changes for guest support]

After updates, say: "Guest Mode successfully added. Test by clicking 'Continue as Guest' on login page."

Start updating the implementation now — keep everything else unchanged.
labels: ["feature", "full-stack", "guest-mode"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/src/app/signin/page.tsx
  - backend/dependencies.py
tests_yaml: []
prompt_text: |
  ---
  description: Execute the implementation plan by processing and executing all tasks defined in tasks.md
  ---

  ## User Input

  ```text
  $ARGUMENTS
  ```

  You **MUST** consider the user input before proceeding (if not empty).

  ## Outline

  1. Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

  2. **Check checklists status** (if FEATURE_DIR/checklists/ exists):
     - Scan all checklist files in the checklists/ directory
     - For each checklist, count:
       - Total items: All lines matching `- [ ]` or `- [X]` or `- [x]`
       - Completed items: Lines matching `- [X]` or `- [x]`
       - Incomplete items: Lines matching `- [ ]`
     - Create a status table:

       ```text
       | Checklist | Total | Completed | Incomplete | Status |
       |-----------|-------|-----------|------------|--------|
       | ux.md     | 12    | 12        | 0          | ✓ PASS |
       | test.md   | 8     | 5         | 3          | ✗ FAIL |
       | security.md | 6   | 6         | 0          | ✓ PASS |
       ```

     - Calculate overall status:
       - **PASS**: All checklists have 0 incomplete items
       - **FAIL**: One or more checklists have incomplete items

     - **If any checklist is incomplete**:
       - Display the table with incomplete item counts
       - **STOP** and ask: "Some checklists are incomplete. Do you want to proceed with implementation anyway? (yes/no)"
       - Wait for user response before continuing
       - If user says "no" or "wait" or "stop", halt execution
       - If user says "yes" or "proceed" or "continue", proceed to step 3

     - **If all checklists are complete**:
       - Display the table showing all checklists passed
       - Automatically proceed to step 3

  3. Load and analyze the implementation context:
     - **REQUIRED**: Read tasks.md for the complete task list and execution plan
     - **REQUIRED**: Read plan.md for tech stack, architecture, and file structure
     - **IF EXISTS**: Read data-model.md for entities and relationships
     - **IF EXISTS**: Read contracts/ for API specifications and test requirements
     - **IF EXISTS**: Read research.md for technical decisions and constraints
     - **IF EXISTS**: Read quickstart.md for integration scenarios

  4. **Project Setup Verification**:
     - **REQUIRED**: Create/verify ignore files based on actual project setup:

     **Detection & Creation Logic**:
     - Check if the following command succeeds to determine if the repository is a git repo (create/verify .gitignore if so):

       ```sh
       git rev-parse --git-dir 2>/dev/null
       ```

     - Check if Dockerfile* exists or Docker in plan.md → create/verify .dockerignore
     - Check if .eslintrc* exists → create/verify .eslintignore
     - Check if eslint.config.* exists → ensure the config's `ignores` entries cover required patterns
     - Check if .prettierrc* exists → create/verify .prettierignore
     - Check if .npmrc or package.json exists → create/verify .npmignore (if publishing)
     - Check if terraform files (*.tf) exist → create/verify .terraformignore
     - Check if .helmignore needed (helm charts present) → create/verify .helmignore

     **If ignore file already exists**: Verify it contains essential patterns, append missing critical patterns only
     **If ignore file missing**: Create with full pattern set for detected technology

     **Common Patterns by Technology** (from plan.md tech stack):
     - **Node.js/JavaScript/TypeScript**: `node_modules/`, `dist/`, `build/`, `*.log`, `.env*`
     - **Python**: `__pycache__/`, `*.pyc`, `.venv/`, `venv/`, `dist/`, `*.egg-info/`
     - **Java**: `target/`, `*.class`, `*.jar`, `.gradle/`, `build/`
     - **C#/.NET**: `bin/`, `obj/`, `*.user`, `*.suo`, `packages/`
     - **Go**: `*.exe`, `*.test`, `vendor/`, `*.out`
     - **Ruby**: `.bundle/`, `log/`, `tmp/`, `*.gem`, `vendor/bundle/`
     - **PHP**: `vendor/`, `*.log`, `*.cache`, `*.env`
     - **Rust**: `target/`, `debug/`, `release/`, `*.rs.bk`, `*.rlib`, `*.prof*`, `.idea/`, `*.log`, `.env*`
     - **Kotlin**: `build/`, `out/`, `.gradle/`, `.idea/`, `*.class`, `*.jar`, `*.iml`, `*.log`, `.env*`
     - **C++**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.so`, `*.a`, `*.exe`, `*.dll`, `.idea/`, `*.log`, `.env*`
     - **C**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.a`, `*.so`, `*.exe`, `Makefile`, `config.log`, `.idea/`, `*.log`, `.env*`
     - **Swift**: `.build/`, `DerivedData/`, `*.swiftpm/`, `Packages/`
     - **R**: `.Rproj.user/`, `.Rhistory`, `.RData`, `.Ruserdata`, `*.Rproj`, `packrat/`, `renv/`
     - **Universal**: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `.vscode/`, `.idea/`

     **Tool-Specific Patterns**:
     - **Docker**: `node_modules/`, `.git/`, `Dockerfile*`, `.dockerignore`, `*.log*`, `.env*`, `coverage/`
     - **ESLint**: `node_modules/`, `dist/`, `build/`, `coverage/`, `*.min.js`
     - **Prettier**: `node_modules/`, `dist/`, `build/`, `coverage/`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
     - **Terraform**: `.terraform/`, `*.tfstate*`, `*.tfvars`, `.terraform.lock.hcl`
     - **Kubernetes/k8s**: `*.secret.yaml`, `secrets/`, `.kube/`, `kubeconfig*`, `*.key`, `*.crt`

  5. Parse tasks.md structure and extract:
     - **Task phases**: Setup, Tests, Core, Integration, Polish
     - **Task dependencies**: Sequential vs parallel execution rules
     - **Task details**: ID, description, file paths, parallel markers [P]
     - **Execution flow**: Order and dependency requirements

  6. Execute implementation following the task plan:
     - **Phase-by-phase execution**: Complete each phase before moving to the next
     - **Respect dependencies**: Run sequential tasks in order, parallel tasks [P] can run together
     - **Follow TDD approach**: Execute test tasks before their corresponding implementation tasks
     - **File-based coordination**: Tasks affecting the same files must run sequentially
     - **Validation checkpoints**: Verify each phase completion before proceeding

  7. Implementation execution rules:
     - **Setup first**: Initialize project structure, dependencies, configuration
     - **Tests before code**: If you need to write tests for contracts, entities, and integration scenarios
     - **Core development**: Implement models, services, CLI commands, endpoints
     - **Integration work**: Database connections, middleware, logging, external services
     - **Polish and validation**: Unit tests, performance optimization, documentation

  8. Progress tracking and error handling:
     - Report progress after each completed task
     - Halt execution if any non-parallel task fails
     - For parallel tasks [P], continue with successful tasks, report failed ones
     - Provide clear error messages with context for debugging
     - Suggest next steps if implementation cannot proceed
     - **IMPORTANT** For completed tasks, make sure to mark the task off as [X] in the tasks file.

  9. Completion validation:
     - Verify all required tasks are completed
     - Check that implemented features match the original specification
     - Validate that tests pass and coverage meets requirements
     - Confirm the implementation follows the technical plan
     - Report final status with summary of completed work

  Note: This command assumes a complete task breakdown exists in tasks.md. If tasks are incomplete or missing, suggest running `/sp.tasks` first to regenerate the task list.

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


  /sp.implement You are an expert full-stack developer using strict Spec-Driven Development (Spec-Kit Plus workflow).

  Update the existing Phase II: Todo Full-Stack Web Application implementation to add Guest Mode.

  Important Rules:
  - Do NOT change or break any existing functionality (JWT auth, user ownership, API endpoints, database models, frontend pages, etc.).
  - Keep the current structure exactly the same: frontend/ (Next.js App Router), backend/ (FastAPI + SQLModel), Neon PostgreSQL.
  - Only add Guest Mode: If a user does NOT want to sign up or sign in, immediately allow access as a guest.
  - Guest users get a temporary ID (e.g. "guest_" + random 6-digit number or UUID).
  - Guests can fully use the app: create, read, update, delete their own tasks.
  - Guest data is stored in the database under their guest ID (isolated from real users).
  - Real users can still sign up/sign in normally (no change).
  - Add a clear "Continue as Guest" button on the login/signup page.

  Do this step-by-step automatically (no permission needed):
  1. Update frontend login page (frontend/src/app/login/page.tsx or similar) to add "Continue as Guest" button.
  2. When clicked, generate guest ID, store in localStorage/sessionStorage, and redirect to dashboard/tasks page.
  3. Update backend auth middleware to accept missing/invalid token as guest (return guest ID).
  4. Ensure all task operations filter by current_user_id (works for both real users and guests).
  5. Add simple guest cleanup (optional: expire after 24h or browser close).

  Generate/update files in this format:

  === frontend/src/app/login/page.tsx ===
  [updated full code]

  === backend/auth.py ===
  [updated auth functions]

  === backend/routers/tasks.py ===
  [any small changes for guest support]

  After updates, say: "Guest Mode successfully added. Test by clicking 'Continue as Guest' on login page."

  Start updating the implementation now — keep everything else unchanged.
response_text: |
  Guest Mode successfully added. To test it, please:

  1.  **Ensure your backend server is running.**
  2.  **Ensure your frontend development server is running.**
  3.  Open your browser and navigate to `http://localhost:3001/signin`.
  4.  Click the new "**Continue as Guest**" button.

  You should be redirected to the tasks page, and as a guest, you should be able to create, read, update, and delete tasks.

  If you encounter any issues or notice slow performance, please provide the **backend `uvicorn` console logs** and relevant information from your **browser's Network tab** as requested previously.
outcome: success
evaluation:
---
