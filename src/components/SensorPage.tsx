import { IonButton, IonContent, IonPage } from "@ionic/react";
import type { ReactNode } from "react";

interface SensorPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SensorPage({
  title,
  description,
  children,
}: SensorPageProps) {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto w-11/12 max-w-2xl py-8">
          <IonButton routerLink="/" fill="clear">
            Volver al inicio
          </IonButton>
          <h1 className="my-4 text-4xl font-bold">{title}</h1>
          <p className="mb-6">{description}</p>
          <section className="flex flex-col items-start gap-4 rounded-lg bg-gray-100 p-6 shadow-md">
            {children}
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
}
