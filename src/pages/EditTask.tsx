import { useState } from "react";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { Navigate, useNavigate } from "react-router-dom";
import mailBox from "../assets/svg/mailBox.svg";
import Navbar from "../components/Navbar";
import { PageLoader } from "../components/PageLoader";
import { useTasks } from "../hooks/useTasks";

export function EditTask() {
  const {
    loading,
    selectedTask,
    updateTask,
    clearSelectedTask,
    error,
    isOnline,
  } = useTasks();
  const navigate = useNavigate();
  const [name, setName] = useState(selectedTask?.name ?? "");
  const [description, setDescription] = useState(
    selectedTask?.description ?? "",
  );

  if (loading) {
    return <PageLoader />;
  }

  if (!selectedTask) {
    return <Navigate to="/tasks" replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void updateTask(selectedTask.id, name.trim(), description.trim())
      .then(() => navigate("/tasks"))
      .catch(() => undefined);
  };

  const handleCancel = () => {
    clearSelectedTask();
    navigate("/tasks");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar
          title="Editar tarea"
          imgUrl={mailBox}
          alt="Imagen de un buzón de mensajes morado"
        />
        <main className="mx-auto mt-12 w-11/12 max-w-xl">
          <h2 className="mb-8 text-center text-4xl font-bold">Editar tarea</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-6 rounded-lg bg-gray-100 p-6 shadow-md"
          >
            <label className="w-full" htmlFor="edit-task-name">
              Nombre
            </label>
            {!isOnline && (
              <IonText color="warning">
                <p role="status">Conéctate a internet para editar tareas.</p>
              </IonText>
            )}
            {error && (
              <IonText color="danger">
                <p role="alert">{error}</p>
              </IonText>
            )}
            <input
              id="edit-task-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={!isOnline}
              required
              className="w-full"
            />
            <label className="w-full" htmlFor="edit-task-description">
              Descripción
            </label>
            <textarea
              id="edit-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={!isOnline}
              required
              rows={4}
              className="w-full"
            />
            <div className="flex gap-4">
              <IonButton type="submit" disabled={!isOnline}>
                Guardar cambios
              </IonButton>
              <IonButton type="button" fill="outline" onClick={handleCancel}>
                Cancelar
              </IonButton>
            </div>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
}
