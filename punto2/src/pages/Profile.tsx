import { IonContent, IonPage } from "@ionic/react";
import pfp from "../assets/png/pfp.png";

export function Profile() {
  return (
    <>
      <IonPage>
        <IonContent>
          <div className="mt-16">
            <div className="flex flex-col items-center text-center w-full">
              <img
                src={pfp}
                alt="Imagen de perfil morada"
                className="w-60 m-15"
              />
              <h2>Dr. Sebastian Leiton</h2>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
