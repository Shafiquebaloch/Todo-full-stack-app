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
import { cn } from "@/lib/utils";

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
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: description.trim() });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "sm:max-w-md overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/60",
          "bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900",
          "shadow-2xl shadow-indigo-500/10 backdrop-blur-sm"
        )}
      >
        {/* Decorative gradient top bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <DialogHeader className="pt-6 pb-4 px-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {taskToEdit ? "Edit Task" : "New Task"}
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400 mt-1.5">
            {taskToEdit
              ? "Make changes to your task below."
              : "Add a new task to stay organized."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label 
              htmlFor="title" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="transition-all focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 dark:focus:ring-indigo-400/40"
              required
              autoFocus
            />
          </div>

          {/* Description - kept as single-line Input */}
          <div className="space-y-2">
            <label 
              htmlFor="description" 
              className="text-sm font-medium  text-white dark:text-slate-300"
            >
              Description (optional)
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details or notes..."
              className="transition-all focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 dark:focus:ring-indigo-400/40"
            />
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-300 text-white dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              disabled={loading}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              className={cn(
                "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
                "text-white shadow-md shadow-indigo-500/20",
                "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                "min-w-[120px]"
              )}
              disabled={loading || !title.trim()}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 text-white nimate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </span>
              ) : taskToEdit ? "Update Task" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};