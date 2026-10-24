import { useEffect, useRef, useState } from "react";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import type { AccelListenerEvent } from "@capacitor/motion";
import { STAY_SECONDS } from "../mockdata/missions.mockdata";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { useHaptics } from "../hooks/useHaptics";
import { useMissions } from "../hooks/useMissions";

export function StayMission() {
  const { missions, completeMission, error: progressError } = useMissions();
  const { startListening, stopListening, error: motionError } = useAccelerometer();
  const { vibrate, error: hapticsError } = useHaptics();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalId = useRef<number | null>(null);
  const quietSince = useRef<number | null>(null);
  const previousAcceleration = useRef<{ x: number; y: number; z: number } | null>(
    null,
  );
  const hasSensorData = useRef(false);
  const completedRef = useRef(false);
  const mission = missions.find(({ id }) => id === 3);

  const clearTimer = () => {
    if (intervalId.current !== null) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const finishMission = async () => {
    if (completedRef.current) return;
    completedRef.current = true;
    clearTimer();
    setIsRunning(false);
    try {
      await stopListening();
    } catch (listenerError) {
      setError(
        listenerError instanceof Error
          ? listenerError.message
          : "No se pudo detener el acelerómetro.",
      );
    }
    try {
      await vibrate();
    } catch (hapticsFailure) {
      setError(
        hapticsFailure instanceof Error
          ? hapticsFailure.message
          : "No se pudo vibrar el dispositivo.",
      );
    }
    try {
      await completeMission(3);
    } catch (completionError) {
      setError(
        completionError instanceof Error
          ? completionError.message
          : "No se pudo completar la misión.",
      );
    }
  };

  const handleAcceleration = (event: AccelListenerEvent) => {
    const acceleration = event.accelerationIncludingGravity;
    const previous = previousAcceleration.current;
    previousAcceleration.current = acceleration;
    if (!previous) {
      hasSensorData.current = true;
      quietSince.current = Date.now();
      return;
    }
    hasSensorData.current = true;
    const magnitude = Math.hypot(acceleration.x, acceleration.y, acceleration.z);
    const previousMagnitude = Math.hypot(
      previous.x,
      previous.y,
      previous.z,
    );
    const change = Math.sqrt(
      (acceleration.x - previous.x) ** 2 +
        (acceleration.y - previous.y) ** 2 +
        (acceleration.z - previous.z) ** 2,
    );
    if (change > 0.45 || Math.abs(magnitude - previousMagnitude) > 0.45) {
      quietSince.current = Date.now();
      setSeconds(0);
    }
  };

  const startMission = async () => {
    if (mission?.status === "locked") return;
    setError(null);
    setSeconds(0);
    completedRef.current = false;
    hasSensorData.current = false;
    quietSince.current = Date.now();
    previousAcceleration.current = null;
    setIsRunning(true);
    try {
      await startListening(handleAcceleration);
      clearTimer();
      intervalId.current = window.setInterval(() => {
        if (!hasSensorData.current) return;
        const elapsed = Math.floor((Date.now() - (quietSince.current ?? Date.now())) / 1000);
        setSeconds(elapsed);
        if (elapsed >= STAY_SECONDS) void finishMission();
      }, 250);
    } catch (motionFailure) {
      setIsRunning(false);
      setError(
        motionFailure instanceof Error
          ? motionFailure.message
          : "No se pudo iniciar el acelerómetro.",
      );
    }
  };

  useEffect(
    () => () => {
      if (intervalId.current !== null) {
        window.clearInterval(intervalId.current);
      }
      void stopListening();
    },
    [stopListening],
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto max-w-2xl p-5 sm:p-8">
          <IonButton fill="clear" routerLink="/missions">← Mis misiones</IonButton>
          <h1 className="my-3 text-4xl font-bold">Misión 3: Permanencia</h1>
          <p>Quédate quieto durante {STAY_SECONDS} segundos. Si te mueves, el conteo vuelve a cero.</p>
          {mission?.status === "locked" ? (
            <IonText color="warning"><p>Completa primero la misión de movimiento para desbloquear esta.</p></IonText>
          ) : mission?.status === "completed" ? (
            <IonText color="success"><p>¡Misión completada!</p></IonText>
          ) : (
            <>
              <p className="my-4 text-3xl font-semibold">{seconds} / {STAY_SECONDS} s</p>
              <IonButton onClick={() => void startMission()} disabled={isRunning}>
                {isRunning ? "Mantente quieto..." : "Iniciar"}
              </IonButton>
            </>
          )}
          {(error || motionError || hapticsError || progressError) && (
            <IonText color="danger"><p role="alert">{error || motionError || hapticsError || progressError}</p></IonText>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}
