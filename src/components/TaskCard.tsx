import type { Task } from "../interfaces/task.interface";
import { IonButton } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => Promise<void>;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const navigate = useNavigate();
  const { selectTask, isOnline } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    selectTask(task);
    navigate("/tasks/edit");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch {
      // The tasks page displays the error from the task context.
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className="flex items-center gap-4 justify-between w-full items-center rounded-lg bg-white p-4 text-left shadow-sm">
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-gray-900">
          {task.name}
        </p>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="flex w-full justify-between items-center gap-4 justify-end">
        <label>
          <input
            type="checkbox"
            className="w-5 h-5 accent-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
          />
        </label>
        <IonButton
          type="button"
          onClick={handleEdit}
          fill="outline"
          className="shrink-0"
          aria-label={`Editar tarea ${task.name}`}
          disabled={!isOnline}
        >
          Editar
        </IonButton>
        <IonButton
          type="button"
          onClick={() => void handleDelete()}
          color="danger"
          className="shrink-0"
          aria-label={`Borrar tarea ${task.name}`}
          disabled={!isOnline || isDeleting}
        >
          Borrar
        </IonButton>
      </div>
    </li>
  );
}
