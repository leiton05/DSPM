import { IonButton, IonContent, IonPage } from "@ionic/react";

const sensors = [
  { label: "Geolocation", path: "/sensors/geolocation" },
  { label: "Camera", path: "/sensors/camera" },
  { label: "Motion", path: "/sensors/motion" },
  { label: "Device", path: "/sensors/device" },
  { label: "Haptics", path: "/sensors/haptics" },
  { label: "Filesystem", path: "/sensors/filesystem" },
  { label: "Local Notifications", path: "/sensors/local-notifications" },
  { label: "Push Notifications", path: "/sensors/push-notifications" },
];

export function Home() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto flex min-h-screen w-11/12 max-w-3xl flex-col justify-center py-10">
          <h1 className="mb-3 text-5xl font-bold">Capacitor Sensors</h1>
          <p className="mb-6 text-lg">
            Selecciona una API para probarla en esta aplicación Ionic.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sensors.map((sensor) => (
              <IonButton
                key={sensor.path}
                routerLink={sensor.path}
                expand="block"
              >
                {sensor.label}
              </IonButton>
            ))}
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
}
