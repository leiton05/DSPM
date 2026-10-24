import { useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { IonButton, IonText } from "@ionic/react";
import { SensorPage } from "../components/SensorPage";

export function LocalNotificationsPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const scheduleNotification = async () => {
    setError("");
    setMessage("");
    try {
      const permission = await LocalNotifications.requestPermissions();
      if (permission.display !== "granted") {
        throw new Error("Debes permitir las notificaciones para continuar.");
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: "Notificación de prueba",
            body: "La notificación local de Capacitor está funcionando.",
            schedule: { at: new Date(Date.now() + 5000) },
          },
        ],
      });
      setMessage("Notificación programada para dentro de 5 segundos.");
    } catch (notificationError) {
      setError(
        notificationError instanceof Error
          ? notificationError.message
          : "No se pudo programar la notificación.",
      );
    }
  };

  return (
    <SensorPage
      title="Local Notifications"
      description="Programa una notificación local para dentro de cinco segundos."
    >
      <IonButton onClick={() => void scheduleNotification()}>
        Programar notificación
      </IonButton>
      {message && <p role="status">{message}</p>}
      {error && (
        <IonText color="danger">
          <p role="alert">{error}</p>
        </IonText>
      )}
    </SensorPage>
  );
}
