import { LocalNotifications } from "@capacitor/local-notifications";
import { useState } from "react";

export function useLocalNotifications() {
  const [error, setError] = useState<string | null>(null);

  const notify = async (title: string, body: string) => {
    setError(null);
    try {
      let permission = await LocalNotifications.checkPermissions();
      if (permission.display !== "granted") {
        permission = await LocalNotifications.requestPermissions();
      }
      if (permission.display !== "granted") {
        throw new Error(
          "Permite las notificaciones para recibir avisos de tus misiones.",
        );
      }
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now() % 2147483647,
            title,
            body,
            schedule: { at: new Date(Date.now() + 1000) },
          },
        ],
      });
    } catch (notificationError) {
      const message =
        notificationError instanceof Error
          ? notificationError.message
          : "No se pudo programar la notificación local.";
      setError(message);
      throw new Error(message, { cause: notificationError });
    }
  };

  return { notify, error };
}
