import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TaskItem({ task, onUpdate, onDelete, onToggle }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span className={`ml-3 text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
          {task.title}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onUpdate(task)}
          className="rounded bg-blue-500 px-3 py-1 text-white text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded bg-red-500 px-3 py-1 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
