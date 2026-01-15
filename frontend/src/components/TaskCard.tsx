"use client";

import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const isCompleted = task.completed;
  const displayDate = task.updated_at || task.created_at;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "border border-slate-200/80 dark:border-slate-700/60",
        "hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20",
        "hover:-translate-y-0.5",
        isCompleted
          ? "bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-950 opacity-80"
          : "bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900"
      )}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={isCompleted}
            onCheckedChange={() => onToggle(task.id!)}
            className={cn(
              "mt-1.5 border-2 transition-all",
              isCompleted
                ? "border-transparent bg-gradient-to-r from-indigo-500 to-purple-600"
                : "border-slate-400 hover:border-indigo-400 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-purple-600"
            )}
          />

          <div className="flex-1 min-w-0 space-y-1">
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "block font-medium text-lg leading-tight cursor-pointer transition-all",
                isCompleted
                  ? "line-through text-white dark:text-slate-400"
                  : "text-white dark:text-slate-100"
              )}
            >
              {task.title}
            </label>

            {task.description && (
              <p
                className={cn(
                  "text-sm line-clamp-2",
                  isCompleted
                    ? "text-slate-400 dark:text-slate-500 line-through"
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                {task.description}
              </p>
            )}

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              {displayDate && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>{format(new Date(displayDate), "MMM d, yyyy")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="h-8 w-8 hover:bg-indigo-100/60 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id!)}
              className="h-8 w-8 hover:bg-red-100/60 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};