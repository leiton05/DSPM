import { createContext } from "react";
import type { Task } from "../interfaces/task.interface";

export interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  selectedTask: Task | null;
  addTask: (name: string, description: string) => void;
  deleteTask: (id: number) => void;
  selectTask: (task: Task) => void;
  clearSelectedTask: () => void;
  updateTask: (id: number, name: string, description: string) => void;
}

export const TaskContext = createContext<TaskContextValue | null>(null);
