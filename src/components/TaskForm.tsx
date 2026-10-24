import { useState } from "react";
import { IonButton } from "@ionic/react";

interface TaskFormProps {
  addTask: (name: string, description: string) => Promise<void>;
  disabled?: boolean;
}

export function TaskForm({ addTask, disabled = false }: TaskFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addTask(name.trim(), description.trim());
      setName("");
      setDescription("");
    } catch {
      // The task context exposes the operation error on the page.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center space-y-10 w-full"
    >
      <input
        type="text"
        placeholder="Nombre"
        aria-label="Nombre de la tarea"
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={disabled}
        required
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <input
        type="text"
        placeholder="Descripción"
        aria-label="Descripción de la tarea"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        disabled={disabled}
        required
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <IonButton type="submit" disabled={disabled}>
        Agregar
      </IonButton>
    </form>
  );
}
