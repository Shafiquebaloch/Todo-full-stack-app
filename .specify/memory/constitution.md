<!--
Sync Impact Report:
- Version change: 1.0 -> 1.1.0
- List of modified principles:
  - Principle 1: Generic -> Technology Stack
  - Principle 2: Generic -> Project Structure
  - Principle 3: Generic -> Authentication & Authorization
  - Principle 4: Generic -> API Design
  - Principle 5: Generic -> Data Management
  - Principle 6: Generic -> Code Quality & Security
- Added sections:
  - Principle 7: Traceability & Documentation
  - Principle 8: Future-Readiness
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (No changes needed, but reviewed)
  - ✅ .specify/templates/spec-template.md (No changes needed, but reviewed)
  - ✅ .specify/templates/tasks-template.md (No changes needed, but reviewed)
- Follow-up TODOs: None
-->
# Todo-full-stack-app Constitution

## Core Principles

### Principle 1: Technology Stack
- **Frontend**: Next.js
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (via Neon)
- **Authentication**: `better-auth-library`

### Principle 2: Project Structure
- A monorepo structure MUST be used, containing distinct `frontend/`, `backend/`, and `specs/` directories at the root.
- Agent-specific instructions MAY be present in `CLAUDE.md` files, but this constitution is the ultimate source of truth.

### Principle 3: Authentication & Authorization
- All user-facing endpoints MUST be protected by JWT-based authentication.
- A shared symmetric secret (HS256) for JWTs is required, managed via a `BETTER_AUTH_SECRET` environment variable accessible to both frontend and backend.
- JWT payloads MUST contain a user identifier (as `sub` or `user_id`).

### Principle 4: API Design
- All APIs MUST be RESTful and versioned (e.g., `/api/v1/...`).
- The backend MUST perform input validation for all incoming data, preferably using Pydantic and SQLModel.
- APIs MUST return appropriate HTTP status codes for success and error states.

### Principle 5: Data Management
- SQLModel MUST be used as the ORM for all database interactions.
- A migration tool (e.g., Alembic) MUST be used to manage database schema evolution.
- The database schema MUST enforce a direct relationship between users and tasks via a foreign key.

### Principle 6: Code Quality & Security
- All secrets (database connection strings, API keys, JWT secrets) MUST be loaded from environment variables. They MUST NOT be hardcoded.
- A minimum test coverage of 70-80% is required for critical business logic, including authentication and core CRUD operations.
- Frontend applications MUST be designed with responsive, mobile-first principles.
- Backend code MUST use type hints and dependency injection patterns.
- HTTPS MUST be enforced for all production traffic.

### Principle 7: Traceability & Documentation
- Every feature or change MUST be traceable to a corresponding specification file located in the `specs/` directory.
- The root `README.md` file MUST provide comprehensive setup instructions, including environment variable configuration and commands to run the application.

### Principle 8: Future-Readiness
- System architecture SHOULD be designed with abstractions that facilitate future enhancements, such as AI integrations or a shift to an event-driven model.
- The database schema and authentication systems MUST be designed for extensibility (e.g., adding new user roles or social login providers).

## Governance
- This Constitution is the authoritative source for all architectural and development standards. It supersedes any other guidance, including agent-specific instructions.
- Amendments to this document may only be made via the `/sp.constitution` command, which requires explicit justification and a version increment.
- All code and specifications are subject to validation against these principles.

**Version**: 1.1.0 | **Ratified**: 2026-01-02 | **Last Amended**: 2026-01-02