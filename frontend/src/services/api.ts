import { Task, User, UserCreate } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const signup = async (userData: UserCreate): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to sign up");
  }
  return response.json();
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const formBody = new URLSearchParams();
  formBody.append("username", email);
  formBody.append("password", password);

  const response = await fetch(`${API_BASE_URL}/api/v1/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to log in");
  }
  return response.json();
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  // The backend always returns 200 OK for this endpoint to prevent enumeration attacks,
  // so we don't check for response.ok here for error handling.
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to request password reset.");
  }
  return response.json();
};

export const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, new_password: newPassword }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to reset password.");
  }
  return response.json();
};

export const fetchTasks = async (token: string): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch tasks");
  }
  return response.json();
};

// You'll need to define types in a separate file, e.g., src/types/index.ts
// for UserCreate, User, Task
