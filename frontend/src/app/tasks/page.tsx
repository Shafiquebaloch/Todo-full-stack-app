"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from "@/services/api";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ArrowUpDown, Plus, Search 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { TaskForm } from "@/components/TaskForm";
import { TaskCard } from "@/components/TaskCard";
import { cn } from "@/lib/utils";

type SortOrder = "newest" | "oldest";
type FilterStatus = "all" | "active" | "completed";

export default function TasksPage() {
  const { isAuthenticated, loading: authLoading, token } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

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
            description: err.message || "Failed to load tasks",
            variant: "destructive",
          });
        } finally {
          setDataLoading(false);
        }
      }
    };
    getTasks();
  }, [isAuthenticated, token]);

  const handleSaveTask = async (taskData: { title: string; description: string }) => {
    if (!token) return;
    setFormLoading(true);

    try {
      if (taskToEdit) {
        const updatedTask = await updateTask(token, taskToEdit.id!, { ...taskToEdit, ...taskData });
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        toast({ title: "Success", description: "Task updated successfully" });
      } else {
        const createdTask = await createTask(token, taskData);
        setTasks(prev => [...prev, createdTask]);
        toast({ title: "Success", description: "Task created successfully" });
      }
      setIsFormOpen(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to save task",
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
      setTasks(tasks.filter(t => t.id !== id));
      toast({ title: "Success", description: "Task deleted" });
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const handleToggleTask = async (id: number) => {
    if (!token) return;
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    try {
      await toggleTask(token, id);
    } catch (err: any) {
      setTasks(originalTasks);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        (t.description?.toLowerCase().includes(q) ?? false)
      );
    }

    if (filterStatus === "active") result = result.filter(t => !t.completed);
    else if (filterStatus === "completed") result = result.filter(t => t.completed);

    result.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [tasks, searchQuery, filterStatus, sortOrder]);

  const activeCount = tasks.filter(t => !t.completed).length;

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/70 to-purple-950 grid place-items-center text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-xl font-medium">Loading... please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen pb-20 transition-colors duration-500",
      "bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20",
      "dark:from-slate-950 dark:via-indigo-950/40 dark:to-purple-950/30"
    )}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Tasks
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300 font-medium">
              {activeCount} active • {tasks.length} total
            </p>
          </div>

          <Button 
            onClick={() => { setTaskToEdit(null); setIsFormOpen(true); }}
            className={cn(
              "gap-2 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/30",
              "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700",
              "text-white hover:text-white",
              "active:scale-95 transition-all duration-300"
            )}
          >
            <Plus className="h-5 w-5" />
            New Task
          </Button>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 dark:text-slate-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={cn(
                "pl-12 h-12 rounded-xl",
                "bg-white dark:bg-slate-800",
                "border-slate-300 dark:border-slate-600",
                "focus:border-indigo-500 focus:ring-indigo-500/30",
                "text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              )}
            />
          </div>

          <div className="flex gap-3 items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl border-slate-300 dark:border-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/40"
              onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
            >
              <ArrowUpDown className="h-5 w-5" />
            </Button>

            <Tabs value={filterStatus} onValueChange={v => setFilterStatus(v as FilterStatus)}>
              <TabsList className="h-12 px-2 rounded-xl bg-slate-200/80 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="active"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger 
                  value="completed"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Tasks List */}
        {dataLoading ? (
          <div className="text-center py-24 text-slate-500 dark:text-slate-400">
            <div className="animate-pulse text-6xl mb-4">⋯</div>
            <p className="text-lg">Loading tasks...</p>
          </div>
        ) : filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-24 space-y-6">
            <div className="text-8xl opacity-60 animate-bounce">📝</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200">
              {searchQuery || filterStatus !== "all" 
                ? "No tasks found" 
                : "No tasks yet!"}
            </h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {searchQuery || filterStatus !== "all"
                ? "Try changing search or filter"
                : "Create your first task to get started"}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <Button 
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
              >
                Create First Task
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {
                  setTaskToEdit(task);
                  setIsFormOpen(true);
                }}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            ))}
          </div>
        )}

        <TaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveTask}
          taskToEdit={taskToEdit}
          loading={formLoading}
        />
      </div>
    </div>
  );
}