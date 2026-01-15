export interface User {
  id: number;
  email: string;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  owner_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}
