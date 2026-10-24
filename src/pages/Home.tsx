import mailBox from "../assets/svg/mailBox.svg";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { useNetwork } from "../hooks/useNetwork";

export function Home() {
  const { isOnline } = useNetwork();

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
              Contactos con Firebase, tareas en tiempo real y frutas guardadas
              localmente.
            </p>
            {!isOnline && (
              <IonText color="warning">
                <p role="status">
                  Sin conexión: Contactos y Tareas están deshabilitados.
                </p>
              </IonText>
            )}
            <div className="flex flex-wrap gap-3">
              <IonButton routerLink="/contacts" disabled={!isOnline}>
                Contactos
              </IonButton>
              <IonButton routerLink="/tasks" disabled={!isOnline}>
                Tareas
              </IonButton>
              <IonButton routerLink="/fruits">Frutas (Dexie)</IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
