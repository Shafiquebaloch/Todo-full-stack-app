"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from "@/services/api";
import { Task, TaskCreate } from "@/types";
import TaskItem from "@/components/TaskItem";
import { toast } from "react-hot-toast";

export default function TasksPage() {
  const { isAuthenticated, loading, logoutUser, token } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const getTasks = async () => {
      if (isAuthenticated && token) {
        try {
          setDataLoading(true);
          const userTasks = await fetchTasks(token);
          setTasks(userTasks);
        } catch (err: any) {
          setError(err.message || "Failed to fetch tasks.");
          toast.error(err.message || "Failed to fetch tasks.");
        } finally {
          setDataLoading(false);
        }
      }
    };
    getTasks();
  }, [isAuthenticated, token]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !token) return;

    try {
      setError(null);
      const createdTask = await createTask(token, { title: newTaskTitle });
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTaskTitle("");
      toast.success("Task created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create task.");
      toast.error(err.message || "Failed to create task.");
    }
  };

  const handleUpdateTask = async (task: Task) => {
    if (!token) return;
    try {
      const updated = await updateTask(token, task);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      toast.success("Task updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to update task.");
      toast.error(err.message || "Failed to update task.");
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!token) return;
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success("Task deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete task.");
      toast.error(err.message || "Failed to delete task.");
    }
  };

  const handleToggleTask = async (id: number) => {
    if (!token) return;
    try {
      const updated = await toggleTask(token, id);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      toast.success("Task status updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to toggle task.");
      toast.error(err.message || "Failed to toggle task.");
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
          <button
            onClick={logoutUser}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
        )}

        <form onSubmit={handleCreateTask} className="mb-8 flex">
          <input
            type="text"
            placeholder="Add a new task"
            className="flex-grow rounded-l-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <button
            type="submit"
            className="rounded-r-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Task
          </button>
        </form>

        <div className="space-y-4">
          {dataLoading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-600">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
