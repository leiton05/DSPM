import mailBox from "../assets/svg/mailBox.svg";
import { IonButton, IonContent, IonPage } from "@ionic/react";

export function Home() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex min-h-screen items-center">
          <div className="flex w-3/7 m-10 justify-end">
            <img
              src={mailBox}
              alt="Imagen de un buzón de mensajes morado"
              className="w-150"
            />
          </div>
          <div className="w-4/7 m-10">
            <h1 className="text-8xl text-red-500 font-bold mb-6">
              Kitty-Tasks
            </h1>
            <p className="text-4xl">
              Bienvenido a <strong>Kitty-Tasks</strong>
            </p>
            <p className="text-2xl">
              Lugar donde puedes administrar tus queridas{" "}
              <strong>tareas</strong> :D
            </p>
            <IonButton routerLink="/tasks" className="mt-6">
              Ingresar
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
