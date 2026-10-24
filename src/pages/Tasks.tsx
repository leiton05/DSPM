import mailBox from "../assets/svg/mailBox.svg";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import Navbar from "../components/Navbar";
import { PageLoader } from "../components/PageLoader";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../interfaces/task.interface";
import { IonContent, IonPage, IonText } from "@ionic/react";

export function Tasks() {
  const { loading, tasks, addTask, deleteTask, error, isOnline } = useTasks();

  if (loading && isOnline) {
    return <PageLoader />;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar
          title="Tareitas"
          imgUrl={mailBox}
          alt="Imagen de un buzón de mensajes morado"
        />
        <main className="flex">
          <div className="justify-center text-center w-1/2">
            {!isOnline && (
              <IonText color="warning">
                <p role="status">Conéctate a internet para usar las tareas.</p>
              </IonText>
            )}
            {error && (
              <IonText color="danger">
                <p role="alert">{error}</p>
              </IonText>
            )}
            <h2 className="text-4xl font-bold mb-15 mt-15">Agrega una tarea</h2>
            <div className=" flex justify-center items-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
              <TaskForm addTask={addTask} disabled={!isOnline} />
            </div>
          </div>
          <div className="justify-center text-center w-1/2">
            <h2 className="text-4xl font-bold mb-15 mt-15">Tareas</h2>
            <div className="flex justify-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
              <ul className="flex w-full flex-col gap-3">
                {tasks.map((task: Task) => (
                  <TaskCard key={task.id} task={task} onDelete={deleteTask} />
                ))}
              </ul>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
}
