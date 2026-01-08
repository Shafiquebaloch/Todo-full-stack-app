"use client";

import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit } from "lucide-react";

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
  return (
    <Card
      className={`transition-colors ${
        task.completed
          ? "bg-slate-200 dark:bg-slate-800"
          : "bg-white dark:bg-slate-900"
      }`}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id!)}
            className="border-slate-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          />
          <div>
            <label
              htmlFor={`task-${task.id}`}
              className={`font-medium cursor-pointer ${
                task.completed
                  ? "line-through text-slate-500"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {task.title}
            </label>
            {task.description && (
              <p
                className={`text-sm ${
                  task.completed
                    ? "line-through text-slate-400"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(task)}>
            <Edit className="h-4 w-4 text-amber-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(task.id!)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
