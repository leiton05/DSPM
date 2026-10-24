import { IonContent, IonPage, IonSpinner } from "@ionic/react";

export const PageLoader = () => (
  <IonPage>
    <IonContent fullscreen className="ion-text-center ion-padding">
      <IonSpinner name="crescent" role="status" aria-label="Cargando tareas" />
    </IonContent>
  </IonPage>
);
