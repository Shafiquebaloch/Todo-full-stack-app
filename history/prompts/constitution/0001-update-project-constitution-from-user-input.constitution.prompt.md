---
id: 0001
title: Update Project Constitution from User Input
stage: constitution
date: 2026-01-02
surface: agent
model: gemini-1.5-pro-001
feature: none
branch: master
user: {{USER}}
command: /sp.constitution
labels: [constitution, documentation]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution Use `@specs/...` referencing in prompts for layered context.

7. **Clean Code & Quality**  
- Frontend: Follow Next.js best practices, responsive design  
- Backend: Type hints, dependency injection, SQLModel models  
- Database: Proper schema with user-task relation (foreign key)  
- Minimum 80% test coverage for critical paths (auth, CRUD)  
- Use environment variables for secrets (BETTER_AUTH_SECRET, DB credentials)

8. **JWT & Shared Secret Management**  
- Frontend & backend **must** use identical JWT secret (via env var)  
- Prefer symmetric HS256 for simplicity (shared secret)  
- If asymmetric keys → use JWKS endpoint from Better Auth for verification  
- Tokens must include user identifier (sub or user_id)  
- Enforce token expiration & refresh mechanism if needed

9. **Traceability & Documentation**  
- All specs/plans/tasks in versioned `specs/` folder  
- Multiple CLAUDE.md files (root + frontend + backend)  
- Git commits reflect Spec-Kit workflow steps  
- README includes setup (env vars, Neon connection, run commands)

10. **Future-Proofing**  
 Design abstractions that allow easy evolution toward:  
 - AI chatbot integration (Phase III+)  
 - Cloud-native deployment (Docker/K8s)  
 - Event-driven architecture

## Governance

- **Amendments**: Only through `/sp.constitution` command with justification and version increment.  
- **Enforcement**: Validated via Spec-Kit Plus analysis tools.  
- **Conflict Resolution**: Phase II constitution prevails for new elements.

hackathon-todo/
├── .spec-kit/                  # Spec-Kit configuration
├── specs/
│   ├── overview.md
│   ├── architecture.md
│   ├── features/
│   ├── api/
│   ├── database/
│   └── ui/
├── frontend/                   # Next.js application
│   └── CLAUDE.md
├── backend/                    # FastAPI application
│   └── CLAUDE.md
├── CLAUDE.md                   # Root project instructions
└── README.md                                                                                                                                                
### 2.7 Quality & Security Standards
- HTTPS everywhere (Neon enforces it)
- Environment variables for all secrets (DB_URL, JWT_SECRET, etc.)
- Input validation on backend (Pydantic + SQLModel)
- Proper HTTP status codes & error messages
- Basic logging (FastAPI default + optional structlog)
- Frontend: responsive design (mobile-first)
- Minimum test coverage: 70–80% on critical paths (auth + CRUD)

### 2.8 Future-readiness
- Database schema should support future extensions (recurring tasks, priorities, categories, attachments…)
- Authentication design should be extensible toward OAuth providers
- API should be versionable (/api/v1/…)
- Code structure should allow easy addition of AI chatbot (Phase III+)

## 3. Governance

- **Amendments** — Only through explicit Spec-Kit constitution update command with justification
- **Version control** — Every major change increments constitution version
- **Enforcement** — All generated code must be traceable to a specification that complies with this document
- **Current version**: 1.0  
  **Date**: January 02, 2026

## Response snapshot

Updated the project constitution at .specify/memory/constitution.md to version 1.1.0 based on user-provided principles.

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