import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { IonButton, IonText } from "@ionic/react";
import { useState } from "react";
import { SensorPage } from "../components/SensorPage";

export function HapticsPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const vibrate = async () => {
    setError("");
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
      setMessage("Se envió la vibración al dispositivo.");
    } catch (hapticsError) {
      setError(
        hapticsError instanceof Error
          ? hapticsError.message
          : "No se pudo activar la respuesta háptica.",
      );
    }
  };

  return (
    <SensorPage
      title="Haptics"
      description="Prueba una respuesta háptica al tocar el botón."
    >
      <IonButton onClick={() => void vibrate()}>Vibrar</IonButton>
      {message && <p role="status">{message}</p>}
      {error && (
        <IonText color="danger">
          <p role="alert">{error}</p>
        </IonText>
      )}
    </SensorPage>
  );
}
