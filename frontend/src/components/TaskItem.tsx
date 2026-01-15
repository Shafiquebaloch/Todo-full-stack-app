"use client";

import { Task } from "@/types";

import { Pencil, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils"; // shadcn/ui utility (or create your own cn function)

interface TaskItemProps {

  task: Task;

  onUpdate: (task: Task) => void;

  onDelete: (id: number) => void;

  onToggle: (id: number) => void;

}

export default function TaskItem({

  task,

  onUpdate,

  onDelete,

  onToggle,

}: TaskItemProps) {

  const isCompleted = task.completed;

  return (

    <div

      className={cn(

        "group relative flex items-center justify-between gap-4 rounded-xl p-4 transition-all duration-300",

        "bg-white dark:bg-slate-800/60",

        "border border-slate-200/80 dark:border-slate-700/50",

        "hover:shadow-md hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/15",

        "hover:-translate-y-0.5 active:scale-[0.98]",

        isCompleted && "opacity-75 bg-slate-50 dark:bg-slate-900/40"

      )}

    >

      {/* Left side - Checkbox + Title */}

      <div className="flex items-center gap-3 flex-1 min-w-0">

        <div className="relative flex items-center justify-center">

          <input

            type="checkbox"

            id={`task-${task.id}`}

            checked={isCompleted}

            onChange={() => onToggle(task.id)}

            className={cn(

              "h-5 w-5 rounded-md border-2 transition-all duration-200 cursor-pointer",

              "border-slate-300 dark:border-slate-600",

              "focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2",

              isCompleted

                ? "bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent text-white"

                : "bg-white dark:bg-slate-800 hover:border-indigo-400"

            )}

          />

          {/* Animated checkmark when checked */}

          {isCompleted && (

            <div className="absolute inset-0 flex items-center justify-center animate-fade-in">

              <svg

                className="h-3.5 w-3.5 text-white"

                fill="none"

                viewBox="0 0 24 24"

                stroke="currentColor"

                strokeWidth={3}

              >

                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />

              </svg>

            </div>

          )}

        </div>

        <label

          htmlFor={`task-${task.id}`}

          className={cn(

            "font-medium cursor-pointer truncate flex-1",

            "text-slate-900 dark:text-slate-100",

            isCompleted && "line-through text-slate-500 dark:text-slate-400"

          )}

        >

          {task.title}

        </label>

      </div>

      {/* Right side - Action buttons */}

      <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">

        <button

          onClick={() => onUpdate(task)}

          className={cn(

            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium",

            "bg-indigo-50 dark:bg-indigo-950/40 text-white dark:text-indigo-300",

            "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",

            "transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40"

          )}

          aria-label="Edit task"

        >

          <Pencil className="h-4 w-4" />

          <span className="hidden sm:inline text-white">Edit</span>

        </button>

        <button

          onClick={() => onDelete(task.id)}

          className={cn(

            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium",

            "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300",

            "hover:bg-red-100 dark:hover:bg-red-900/50",

            "transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40"

          )}

          aria-label="Delete task"

        >

          <Trash2 className="h-4 w-4" />

          <span className="hidden sm:inline text-white">Delete</span>

        </button>

      </div>

    </div>

  );

}