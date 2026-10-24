import { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import type { PluginListenerHandle } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { IonButton, IonText } from "@ionic/react";
import { SensorPage } from "../components/SensorPage";

export function PushNotificationsPage() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const listeners = useRef<PluginListenerHandle[]>([]);

  useEffect(
    () => () => {
      void Promise.all(listeners.current.map((listener) => listener.remove()));
    },
    [],
  );

  const registerForPush = async () => {
    setError("");
    setMessage("");
    if (!Capacitor.isNativePlatform()) {
      setError(
        "Las notificaciones push requieren ejecutar la app en Android o iOS.",
      );
      return;
    }

    try {
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive !== "granted") {
        throw new Error("Debes permitir las notificaciones para continuar.");
      }

      const registrationListener = await PushNotifications.addListener(
        "registration",
        (registration) => setToken(registration.value),
      );
      const errorListener = await PushNotifications.addListener(
        "registrationError",
        (registrationError) => {
          setError(registrationError.error);
        },
      );
      listeners.current.push(registrationListener, errorListener);
      await PushNotifications.register();
      setMessage("Solicitando registro de notificaciones push...");
    } catch (registrationError) {
      setError(
        registrationError instanceof Error
          ? registrationError.message
          : "No se pudo registrar para recibir notificaciones push.",
      );
    }
  };

  return (
    <SensorPage
      title="Push Notifications"
      description="Solicita permiso y registra el dispositivo para recibir notificaciones push."
    >
      <IonButton
        onClick={() => void registerForPush()}
        disabled={!Capacitor.isNativePlatform()}
      >
        Registrar dispositivo
      </IonButton>
      {!Capacitor.isNativePlatform() && (
        <p role="status">Disponible al ejecutar la app en Android o iOS.</p>
      )}
      {token && (
        <p className="break-all" role="status">
          Token: {token}
        </p>
      )}
      {message && <p role="status">{message}</p>}
      {error && (
        <IonText color="danger">
          <p role="alert">{error}</p>
        </IonText>
      )}
    </SensorPage>
  );
}
