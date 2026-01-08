"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Task } from "@/types";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description: string }) => void;
  taskToEdit?: Task | null;
  loading: boolean;
}

export const TaskForm = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
  loading,
}: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-100 dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-indigo-600 dark:text-indigo-400">
            {taskToEdit ? "Edit Task" : "Add New Task"}
          </DialogTitle>
          <DialogDescription>
            {taskToEdit
              ? "Update the details of your task."
              : "Fill in the details for your new task."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
              {loading ? "Saving..." : "Save Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
