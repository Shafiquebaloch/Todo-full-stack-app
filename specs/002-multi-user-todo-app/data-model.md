# Data Model: Multi-User Todo Web Application

This document defines the data entities and their relationships for the application.

## 1. User Entity
Represents a registered user of the application.

- **`id`**: Unique identifier for the user (integer, primary key).
- **`email`**: User's email address (string, unique, indexed). Used for login.
- **`hashed_password`**: The user's password, stored as a secure hash (string).

**Validation Rules**:
- The `email` field must be a valid email format.
- The `email` must be unique across all users.
- A password must be provided during creation and meet minimum complexity requirements (e.g., length).

## 2. Task Entity
Represents a single to-do item created by a user.

- **`id`**: Unique identifier for the task (integer, primary key).
- **`title`**: The description or title of the task (string).
- **`completed`**: A boolean flag indicating whether the task is complete (boolean, default: `false`).
- **`owner_id`**: A foreign key that links the task to the `id` of the user who owns it (integer, indexed).

**Validation Rules**:
- The `title` field cannot be empty.
- The `owner_id` must correspond to an existing user.

## Relationships
- **One-to-Many**: A `User` can have many `Tasks`.
- A `Task` belongs to exactly one `User`.
- The `owner_id` field on the `Task` entity creates this relationship, ensuring that every task is owned by a user and enabling strict data isolation.
