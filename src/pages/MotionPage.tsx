import { useEffect, useRef, useState } from "react";
import { Motion } from "@capacitor/motion";
import type { PluginListenerHandle } from "@capacitor/core";
import type { AccelListenerEvent } from "@capacitor/motion";
import { IonButton, IonText } from "@ionic/react";
import { SensorPage } from "../components/SensorPage";

export function MotionPage() {
  const [motion, setMotion] = useState<AccelListenerEvent | null>(null);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const listeners = useRef<PluginListenerHandle[]>([]);

  const stopListening = async () => {
    await Promise.all(listeners.current.map((listener) => listener.remove()));
    listeners.current = [];
    setListening(false);
  };

  useEffect(() => () => {
    void Promise.all(listeners.current.map((listener) => listener.remove()));
  }, []);

  const startListening = async () => {
    setError("");
    try {
      const listener = await Motion.addListener("accel", setMotion);
      listeners.current.push(listener);
      setListening(true);
    } catch (motionError) {
      setError(
        motionError instanceof Error
          ? motionError.message
          : "No se pudo iniciar el sensor de movimiento.",
      );
    }
  };

  return (
    <SensorPage
      title="Motion"
      description="Lee la aceleración del dispositivo en los ejes X, Y y Z."
    >
      <IonButton
        onClick={() => void (listening ? stopListening() : startListening())}
      >
        {listening ? "Detener sensor" : "Iniciar sensor"}
      </IonButton>
      {motion && (
        <p role="status">
          X: {motion.acceleration.x.toFixed(2)} m/s²
          <br />
          Y: {motion.acceleration.y.toFixed(2)} m/s²
          <br />
          Z: {motion.acceleration.z.toFixed(2)} m/s²
        </p>
      )}
      {error && (
        <IonText color="danger">
          <p role="alert">{error}</p>
        </IonText>
      )}
    </SensorPage>
  );
}
