"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from "@/services/api";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TaskForm } from "@/components/TaskForm";
import { TaskCard } from "@/components/TaskCard";

export default function TasksPage() {
  const { isAuthenticated, loading, logoutUser, token } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  // State for the dialog
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [formLoading, setFormLoading] = useState(false);

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

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleOpenAdd = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const handleSaveTask = async (taskData: { title: string; description: string }) => {
    if (!token) return;
    setFormLoading(true);

    try {
      if (taskToEdit) {
        // Update existing task
        const updatedTask = await updateTask(token, taskToEdit.id!, { ...taskToEdit, ...taskData });
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        toast({ title: "Success", description: "Task updated successfully!" });
      } else {
        // Create new task
        const createdTask = await createTask(token, taskData);
        setTasks((prevTasks) => [...prevTasks, createdTask]);
        toast({ title: "Success", description: "Task created successfully!" });
      }
      setIsFormOpen(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to save task.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!token) return;
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((t) => t.id !== id));
      toast({ title: "Success", description: "Task deleted successfully!" });
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
    const originalTasks = [...tasks];
    // Optimistically update UI
    setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
    try {
      await toggleTask(token, id);
    } catch (err: any) {
      // Revert on error
      setTasks(originalTasks);
      toast({
        title: "Error",
        description: err.message || "Failed to toggle task.",
        variant: "destructive",
      });
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <p className="text-slate-700 dark:text-slate-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Your Tasks</h1>
          <Button onClick={handleOpenAdd} className="bg-indigo-600 hover:bg-indigo-700">
            Add Task
          </Button>
        </div>

        <TaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveTask}
          taskToEdit={taskToEdit}
          loading={formLoading}
        />

        <div className="space-y-4">
          {dataLoading ? (
            <p className="text-slate-700 dark:text-slate-300">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-600 dark:text-slate-400">No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleOpenEdit}
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
