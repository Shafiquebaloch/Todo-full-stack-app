---
id: 0007
title: Analyze spec, plan, and tasks for consistency
stage: misc
date: 2026-01-05
surface: agent
model: gemini-1.5-flash-latest
feature: 003-multi-user-todo-app
branch: main
user: UMAIR
command: /sp.analyze
labels: ["analysis", "spec-review", "consistency-check"]
links:
  spec: specs/003-multi-user-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-multi-user-todo-app/spec.md
  - specs/003-multi-user-todo-app/plan.md
  - specs/003-multi-user-todo-app/tasks.md
  - .specify/memory/constitution.md
tests: []
---

## Prompt

```text
---
description: Identify underspecified areas in the current feature spec by asking up to 5 highly targeted clarification questions and encoding answers back into the spec.
handoffs:
  - label: Build Technical Plan
    agent: sp.plan
    prompt: Create a plan for the spec. I am building with...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Detect and reduce ambiguity or missing decision points in the active feature specification and record the clarifications directly in the spec file.

Note: This clarification workflow is expected to run (and be completed) BEFORE invoking `/sp.plan`. If the user explicitly states they are skipping clarification (e.g., exploratory spike), you may proceed, but must warn that downstream rework risk increases.

Execution steps:

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` once from repo root and parse JSON for FEATURE_DIR and AVAILABLE_DOCS. Derive absolute paths:
   - SPEC = FEATURE_DIR/spec.md
   - PLAN = FEATURE_DIR/plan.md
   - TASKS = FEATURE_DIR/tasks.md

Abort with an error message if any required file is missing (instruct the user to run missing prerequisite command).
For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\'m Groot' (or double-quote if possible: "I'm Groot").

2. Load Artifacts (Progressive Disclosure)

Load only the minimal necessary context from each artifact:

**From spec.md:**

- Overview/Context
- Functional Requirements
- Non-Functional Requirements
- User Stories
- Edge Cases (if present)

**From plan.md:**

- Architecture/stack choices
- Data Model references
- Phases
- Technical constraints

**From tasks.md:**

- Task IDs
- Descriptions
- Phase grouping
- Parallel markers [P]
- Referenced file paths

**From constitution:**

- Load `.specify/memory/constitution.md` for principle validation

3. Build Semantic Models

Create internal representations (do not include raw artifacts in output):

- **Requirements inventory**: Each functional + non-functional requirement with a stable key (derive slug based on imperative phrase; e.g., "User can upload file" → `user-can-upload-file`)
- **User story/action inventory**: Discrete user actions with acceptance criteria
- **Task coverage mapping**: Map each task to one or more requirements or stories (inference by keyword / explicit reference patterns like IDs or key phrases)
- **Constitution rule set**: Extract principle names and MUST/SHOULD normative statements

4. Detection Passes (Token-Efficient Analysis)

Focus on high-signal findings. Limit to 50 findings total; aggregate remainder in overflow summary.

#### A. Duplication Detection

- Identify near-duplicate requirements
- Mark lower-quality phrasing for consolidation

#### B. Ambiguity Detection

- Flag vague adjectives (fast, scalable, secure, intuitive, robust) lacking measurable criteria
- Flag unresolved placeholders (TODO, TKTK, ???, `<placeholder>`, etc.)

#### C. Underspecification

- Requirements with verbs but missing object or measurable outcome
- User stories missing acceptance criteria alignment
- Tasks referencing files or components not defined in spec/plan

#### D. Constitution Alignment

- Any requirement or plan element conflicting with a MUST principle
- Missing mandated sections or quality gates from constitution

#### E. Coverage Gaps

- Requirements with zero associated tasks
- Tasks with no mapped requirement/story
- Non-functional requirements not reflected in tasks (e.g., performance, security)

#### F. Inconsistency

- Terminology drift (same concept named differently across files)
- Data entities referenced in plan but absent in spec (or vice versa)
- Task ordering contradictions (e.g., integration tasks before foundational setup tasks without dependency note)
- Conflicting requirements (e.g., one requires Next.js while other specifies Vue)

5. Severity Assignment

Use this heuristic to prioritize findings:

- **CRITICAL**: Violates constitution MUST, missing core spec artifact, or requirement with zero coverage that blocks baseline functionality
- **HIGH**: Duplicate or conflicting requirement, ambiguous security/performance attribute, untestable acceptance criterion
- **MEDIUM**: Terminology drift, missing non-functional task coverage, underspecified edge case
- **LOW**: Style/wording improvements, minor redundancy not affecting execution order

6. Produce Compact Analysis Report

Output a Markdown report (no file writes) with the following structure:

## Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| A1 | Duplication | HIGH | spec.md:L120-134 | Two similar requirements ... | Merge phrasing; keep clearer version |

(Add one row per finding; generate stable IDs prefixed by category initial.)

**Coverage Summary Table:**

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|

**Constitution Alignment Issues:** (if any)

**Unmapped Tasks:** (if any)

**Metrics:**

- Total Requirements
- Total Tasks
- Coverage % (requirements with >=1 task)
- Ambiguity Count
- Duplication Count
- Critical Issues Count

7. Provide Next Actions

At end of report, output a concise Next Actions block:

- If CRITICAL issues exist: Recommend resolving before `/sp.implement`
- If only LOW/MEDIUM: User may proceed, but provide improvement suggestions
- Provide explicit command suggestions: e.g., "Run /sp.specify with refinement", "Run /sp.plan to adjust architecture", "Manually edit tasks.md to add coverage for 'performance-metrics'"

### 8. Offer Remediation

Ask the user: "Would you like me to suggest concrete remediation edits for the top N issues?" (Do NOT apply them automatically.)

## Operating Principles

### Context Efficiency

- **Minimal high-signal tokens**: Focus on actionable findings, not exhaustive documentation
- **Progressive disclosure**: Load artifacts incrementally; don't dump all content into analysis
- **Token-efficient output**: Limit findings table to 50 rows; summarize overflow
- **Deterministic results**: Rerunning without changes should produce consistent IDs and counts

### Analysis Guidelines

- **NEVER modify files** (this is read-only analysis)
- **NEVER hallucinate missing sections** (if absent, report them accurately)
- **Prioritize constitution violations** (these are always CRITICAL)
- **Use examples over exhaustive rules** (cite specific instances, not generic patterns)
- **Report zero issues gracefully** (emit success report with coverage statistics)

## Context

Ignore testing for now. Do NOT run pytest or fix test-related files. Proceed with implementation and continue to the next development steps. We will revisit and fix tests later.

---
All `backend` tests (app, auth, tasks) failed with `OperationalError: no such table: user/task`. This indicates that the in-memory SQLite test database is not correctly initializing and creating tables before the tests attempt to perform operations. The `conftest.py` setup needs further refinement to ensure `SQLModel.metadata.create_all()` is executed on the *correct* engine used by the `TestClient` and its dependencies. This is currently blocking the completion of test implementation for the backend.
```

## Response snapshot

## Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| C1 | Constitution Violation | CRITICAL | tasks.md (T019, T020), backend/test_auth.py, backend/test_tasks.py | Test-related tasks (T019, T020) are marked complete in `tasks.md`, but actual test runs consistently fail due to database setup issues (`OperationalError: no such table`). This violates Constitution Principle 6 (Test Coverage). | Acknowledge the discrepancy; plan to implement tests (currently deferred per user instruction). |
| H1 | Underspecification | HIGH | spec.md (FR-007), tasks.md | Functional Requirement FR-007 (email-based password reset) is stated, but there are no corresponding user stories or explicit tasks in tasks.md for its implementation. | Add a user story for password reset and detailed tasks for backend implementation (endpoint, email service) and frontend (UI flow). |
| M1 | Ambiguity | MEDIUM | spec.md (UI/UX Requirements), tasks.md (T021) | Subjective UI/UX requirements ("Clean, modern, minimal interface", "Responsive design", "Clear visual distinction", "User-friendly error and success messages") in `spec.md` lack measurable criteria. Task T021 ("Review and refine the UI/UX") is too generic to ensure these are met. | Refine UI/UX requirements with measurable metrics (e.g., specific design guidelines, accessibility scores, user feedback mechanisms) and break down T021 into verifiable sub-tasks. |
| M2 | Constitution Inconsistency | MEDIUM | backend/security.py, .specify/memory/constitution.md (Principle 3) | The environment variable name for the JWT secret differs between the implementation (`JWT_SECRET` in `backend/security.py`) and the constitution's specified `BETTER_AUTH_SECRET`. | Align the environment variable name used in code with the constitution's specified name. |
| M3 | Coverage Gap | MEDIUM | spec.md (SC-002), tasks.md | The measurable performance goal SC-002 ("Task lists should load in under 1 second for a user with up to 1000 tasks") has no explicit tasks in `tasks.md` for performance testing, profiling, or optimization. | Add dedicated tasks for performance testing, profiling, and optimization to ensure the specified performance goal can be measured and met. |
| L1 | Ambiguity | LOW | spec.md (FR-008) | Functional Requirement FR-008 ("last-write-wins" strategy for concurrent updates) specifies a strategy but lacks details on how concurrent updates are detected, what the user experience is (e.g., silent update, notification), or how potential conflicts are presented. | Elaborate on the user experience and internal handling mechanisms for concurrent update scenarios in the specification. |

**Coverage Summary Table:**

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|
| FR-001          | Yes       | T004-T006, T009 | Covered by authentication tasks. |
| FR-002          | Yes       | T005-T006, T009 | Covered by authentication tasks. |
| FR-003          | Yes       | T010-T017 | Covered by task management CRUD. |
| FR-004          | Yes       | T011, T013 | Covered by task ownership in API. |
| FR-005          | Yes       | T018 | Covered by global error handling. |
| FR-006          | Yes       | T017 | Covered by task completion toggle. |
| FR-007          | No        | -        | **MISSING**: No explicit tasks for password reset flow. |
| FR-008          | Yes       | T011, T015 | Implicitly covered by update task, but user interaction is vague. |
| US1 (Signup)    | Yes       | T004-T006, T009 | Covered. |
| US2 (Signin)    | Yes       | T005-T006, T009 | Covered. |
| US3 (Task Create)| Yes       | T014 | Covered. |
| US4 (View Tasks)| Yes       | T013 | Covered. |
| SC-001          | Partial   | T005, T006, T011 | Implicitly covered by auth/task APIs, but no specific task to verify 100% adherence. |
| SC-002          | No        | -        | **MISSING**: No tasks for performance testing/optimization (see M3). |
| SC-003          | Yes       | T021 | Generic task, lacks measurable criteria (see M1). |
| SC-004          | Yes       | T009, T021 | Covered by auth UI, but "99% without assistance" lacks specific verification tasks. |

**Constitution Alignment Issues:**
- **Principle 3 (Authentication & Authorization)**: Implementation uses `JWT_SECRET` for JWT secret, while constitution mandates `BETTER_AUTH_SECRET`. (Severity: MEDIUM, ID: M2)
- **Principle 6 (Code Quality & Security - Test Coverage)**: Constitution requires 70-80% test coverage for critical logic. `tasks.md` marks test tasks T019 & T020 as complete, but actual test runs indicated this is not met. This is a critical discrepancy in status. (Severity: CRITICAL, ID: C1 - *Note: Remediation deferred as per user instruction.*)

**Unmapped Tasks:**
- None identified that aren't linked to a requirement/story.

**Metrics:**

- Total Requirements: 16 (8 Functional, 4 User Stories, 4 Success Criteria)
- Total Tasks: 22
- Coverage % (requirements with >=1 task): 81.25% (13 out of 16 requirements have at least partial task coverage)
- Ambiguity Count: 2
- Duplication Count: 0
- Critical Issues Count: 1
---
### Next Actions:
- **CRITICAL Issue**: Address the discrepancy between documented and actual test completion (C1) when testing is revisited.
- **HIGH Issue**: Implement tasks for Password Reset (H1) to ensure the functional requirement is met.
- **MEDIUM Issues**: Refine UI/UX requirements for clarity (M1), align JWT secret variable name with the constitution (M2), and add tasks for performance optimization/testing (M3).
- **LOW Issue**: Elaborate on concurrent update handling in the specification (L1).

Would you like me to suggest concrete remediation edits for the top 3 issues (H1, M1, M2)? (Excluding C1 as per your instruction to ignore testing for now).