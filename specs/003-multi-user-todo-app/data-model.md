# Data Model: Multi-user Todo Management System

This document defines the data models for the entities used in the application, based on the feature specification.

## 1. User

Represents a registered user in the system.

**Fields**:

| Name | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key, Auto-incrementing | Unique identifier for the user. |
| `email` | String | Not Null, Unique | User's email address, used for login. |
| `hashed_password` | String | Not Null | User's password, hashed for security. |

**Relationships**:

- A `User` has a one-to-many relationship with `Task` (one user can have many tasks).

## 2. Task

Represents a single todo item.

**Fields**:

| Name | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key, Auto-incrementing | Unique identifier for the task. |
| `title` | String | Not Null | The title of the task. |
| `description` | String | Nullable | An optional, more detailed description of the task. |
| `completed` | Boolean | Not Null, Default: `false` | The completion status of the task. |
| `owner_id` | Integer | Foreign Key to `User.id` | The ID of the user who owns the task. |

**Relationships**:

- A `Task` has a many-to-one relationship with `User` (each task belongs to one user).
