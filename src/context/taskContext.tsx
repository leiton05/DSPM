import {
  onValue,
  push,
  ref,
  remove,
  set,
  update as updateValue,
} from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getFirebaseDatabase } from "../firebase/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNetwork } from "../hooks/useNetwork";
import { TaskContext } from "./taskContextValue";
import type { Task } from "../interfaces/task.interface";

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const { userId } = useAuth();
  const { isOnline } = useNetwork();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasksUserId, setTasksUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !isOnline) {
      return;
    }

    let active = true;
    let unsubscribe: (() => void) | undefined;

    void Promise.resolve().then(() => {
      if (!active) return;
      try {
        const tasksRef = ref(getFirebaseDatabase(), `users/${userId}/tasks`);
        unsubscribe = onValue(
          tasksRef,
          (snapshot) => {
            if (!active) return;
            const values = snapshot.val() as
              | Record<string, Omit<Task, "id">>
              | null;
            setTasks(
              values
                ? Object.entries(values).map(([id, task]) => ({
                    ...task,
                    id,
                  }))
                : [],
            );
            setTasksUserId(userId);
            setError(null);
          },
          (subscriptionError) => {
            if (!active) return;
            setTasksUserId(userId);
            setError(subscriptionError.message);
          },
        );
      } catch (configurationError) {
        setTasksUserId(userId);
        setError(
          configurationError instanceof Error
            ? configurationError.message
            : "No se pudo configurar Firebase Realtime Database.",
        );
      }
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [isOnline, userId]);

  const performTaskAction = useCallback(
    async (action: () => Promise<void>) => {
      setError(null);
      try {
        await action();
      } catch (actionError) {
        const message =
          actionError instanceof Error
            ? actionError.message
            : "No se pudo completar la operación con la tarea.";
        setError(message);
        throw actionError;
      }
    },
    [],
  );

  const addTask = useCallback(
    async (name: string, description: string) => {
      if (!isOnline) {
        throw new Error("Conéctate a internet para crear tareas.");
      }
      if (!userId) {
        throw new Error("Debes iniciar sesión para crear tareas.");
      }
      await performTaskAction(async () => {
        const taskRef = push(ref(getFirebaseDatabase(), `users/${userId}/tasks`));
        if (!taskRef.key) {
          throw new Error("No se pudo generar un identificador para la tarea.");
        }
        await set(taskRef, { name, description });
      });
    },
    [isOnline, performTaskAction, userId],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      if (!isOnline) {
        throw new Error("Conéctate a internet para eliminar tareas.");
      }
      if (!userId) {
        throw new Error("Debes iniciar sesión para eliminar tareas.");
      }
      await performTaskAction(() =>
        remove(ref(getFirebaseDatabase(), `users/${userId}/tasks/${id}`)),
      );
      setSelectedTask((currentTask) =>
        currentTask?.id === id ? null : currentTask,
      );
    },
    [isOnline, performTaskAction, userId],
  );

  const selectTask = (task: Task) => setSelectedTask(task);
  const clearSelectedTask = () => setSelectedTask(null);

  const updateTask = useCallback(
    async (id: string, name: string, description: string) => {
      if (!isOnline) {
        throw new Error("Conéctate a internet para editar tareas.");
      }
      if (!userId) {
        throw new Error("Debes iniciar sesión para editar tareas.");
      }
      await performTaskAction(() =>
        updateValue(
          ref(getFirebaseDatabase(), `users/${userId}/tasks/${id}`),
          { name, description },
        ),
      );
      setSelectedTask(null);
    },
    [isOnline, performTaskAction, userId],
  );

  return (
    <TaskContext.Provider
      value={{
        tasks: userId && tasksUserId === userId ? tasks : [],
        loading: Boolean(userId && isOnline && tasksUserId !== userId),
        error: !isOnline
          ? "Se requiere conexión a internet para cargar las tareas."
          : error,
        isOnline,
        selectedTask:
          userId && tasksUserId === userId ? selectedTask : null,
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
