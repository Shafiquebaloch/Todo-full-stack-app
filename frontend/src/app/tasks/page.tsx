"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from "@/services/api";
import { Task } from "@/types";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Input } from "@/components/ui/input";     // shadcn/ui Input
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn/ui Card
import { toast } from "@/components/ui/use-toast"; // shadcn/ui toast
import { Checkbox } from "@/components/ui/checkbox"; // Assuming Checkbox component exists or will be created
import { Trash2, Edit } from "lucide-react"; // Icons for delete and edit

export default function TasksPage() {
  const { isAuthenticated, loading, logoutUser, token } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

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
          toast({
            title: "Error",
            description: err.message || "Failed to fetch tasks.",
            variant: "destructive",
          });
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
      const createdTask = await createTask(token, { title: newTaskTitle });
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTaskTitle("");
      toast({
        title: "Success",
        description: "Task created successfully!",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create task.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (task: Task) => {
    if (!token) return;
    try {
      const updated = await updateTask(token, task.id, task);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      toast({
        title: "Success",
        description: "Task updated successfully!",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update task.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!token) return;
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((t) => t.id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully!",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete task.",
        variant: "destructive",
      });
    }
  };

  const handleToggleTask = async (id: number) => {
    if (!token) return;
    try {
      const updated = await toggleTask(token, id);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      toast({
        title: "Success",
        description: "Task status updated successfully!",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to toggle task.",
        variant: "destructive",
      });
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Tasks</h1>
          <Button onClick={logoutUser} variant="destructive" size="sm">
            Logout
          </Button>
        </div>

        <form onSubmit={handleCreateTask} className="mb-8 flex space-x-2">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            Add Task
          </Button>
        </form>

        <div className="space-y-4">
          {dataLoading ? (
            <p className="text-gray-700 dark:text-gray-300">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className="flex items-center p-4 justify-between dark:bg-gray-800 dark:text-white">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleTask(task.id!)}
                    id={`task-${task.id}`}
                  />
                  <label htmlFor={`task-${task.id}`} className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-800 dark:text-white"}`}>
                    {task.title}
                  </label>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleUpdateTask(task)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteTask(task.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
