import { useEffect, useState } from "react";
import type { Task } from "../interfaces/task.interface";
import { initialTasks } from "../mockdata/tasks.mockdata";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
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
  };

  return {
    tasks,
    loading,
    addTask,
    deleteTask,
  };
}
