import { useState } from "react";
import { IonButton } from "@ionic/react";

interface TaskFormProps {
  addTask: (name: string, description: string) => void;
}

export function TaskForm({ addTask }: TaskFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask(name.trim(), description.trim());
    setName("");
    setDescription("");
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
        required
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <input
        type="text"
        placeholder="Descripción"
        aria-label="Descripción de la tarea"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <IonButton type="submit">Agregar</IonButton>
    </form>
  );
}
