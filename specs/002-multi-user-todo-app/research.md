# Research: Multi-User Todo Web Application

This document outlines the research and decisions made for the technical implementation of the multi-user todo web application.

## 1. Frontend Framework: Next.js
- **Decision**: Use Next.js (App Router).
- **Rationale**: The user prompt and constitution explicitly require Next.js. The App Router is the current standard for new Next.js projects, offering benefits like improved routing, layouts, and server components.
- **Alternatives Considered**: None, as this was a hard requirement.

## 2. Backend Framework: FastAPI
- **Decision**: Use FastAPI.
- **Rationale**: The user prompt and constitution explicitly require FastAPI. It is a modern, high-performance Python web framework that is easy to learn and use, with automatic interactive documentation.
- **Alternatives Considered**: None, as this was a hard requirement.

## 3. Database: Neon Serverless PostgreSQL
- **Decision**: Use Neon Serverless PostgreSQL.
- **Rationale**: The user prompt and constitution explicitly require Neon. It offers serverless architecture, which is cost-effective and scales automatically.
- **Alternatives Considered**: None, as this was a hard requirement.

## 4. Authentication: Better Auth (Frontend) + JWT Verification (Backend)
- **Decision**: The frontend will use the "Better Auth" library to handle user authentication and JWT issuance. The backend will verify these JWTs on protected routes.
- **Rationale**: This is a core requirement from the user prompt and constitution. This pattern decouples the authentication logic from the backend API, allowing the backend to be a stateless service that just validates tokens.
- **JWT Verification Library (Backend)**:
    - **Decision**: Use `python-jose` with `passlib` for password hashing.
    - **Rationale**: `python-jose` is a robust library for working with JWTs, and `passlib` is the standard for password hashing in the Python community. This is a common and secure stack for FastAPI applications.
- **Alternatives Considered**: `PyJWT` is another good option, but `python-jose` has broader support for JWS, JWE, JWK, and JWA, making it slightly more feature-rich if needed in the future.

## 5. ORM: SQLModel
- **Decision**: Use SQLModel.
- **Rationale**: The user prompt and constitution explicitly require SQLModel. It combines Pydantic and SQLAlchemy, providing a single, intuitive API for defining data models that are also database tables. This simplifies development and reduces code duplication.
- **Alternatives Considered**: None, as this was a hard requirement.
