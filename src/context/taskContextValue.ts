import { createContext } from "react";
import type { Task } from "../interfaces/task.interface";

export interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  isOnline: boolean;
  selectedTask: Task | null;
  addTask: (name: string, description: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  selectTask: (task: Task) => void;
  clearSelectedTask: () => void;
  updateTask: (id: string, name: string, description: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue | null>(null);
