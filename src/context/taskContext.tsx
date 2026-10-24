import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { initialTasks } from "../mockdata/tasks.mockdata";
import type { Task } from "../interfaces/task.interface";
import { TaskContext } from "./taskContextValue";

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addTask = (name: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      name,
      description,
    };
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    setSelectedTask((currentTask) =>
      currentTask?.id === id ? null : currentTask,
    );
  };

  const selectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const clearSelectedTask = () => {
    setSelectedTask(null);
  };

  const updateTask = (id: number, name: string, description: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, name, description } : task,
      ),
    );
    setSelectedTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        selectedTask,
        addTask,
        deleteTask,
        selectTask,
        clearSelectedTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
