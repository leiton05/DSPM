import type { Task } from "../interfaces/task.interface";

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
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
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="shrink-0 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          aria-label={`Borrar tarea ${task.name}`}
        >
          Borrar
        </button>
      </div>
    </li>
  );
}
