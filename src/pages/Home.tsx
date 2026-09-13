import sun from "../assets/svg/sun.svg";
import { IonPage, IonContent, IonButton } from "@ionic/react";

export function Home() {
  return (
    <>
      <IonPage>
        <IonContent>
          <div className="flex min-h-screen items-center">
            <div className="flex w-3/7 m-10 justify-end">
              <img src={sun} alt="Imagen de un sol morado" className="w-100" />
            </div>
            <div className="w-4/7 m-10">
              <h1 className="text-6xl font-bold mb-6">MediClinic</h1>
              <p className="text-3xl">
                Bienvenido a <strong>MediClinic</strong>
              </p>
              <p className="text-xl">
                Centro de salud que ofrece los siguientes serivcios:
              </p>
              <IonButton routerLink="/hub" size="large" className="mt-6">
                Ingresar
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
