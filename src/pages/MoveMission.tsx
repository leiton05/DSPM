import { useRef, useState } from "react";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import type { Position } from "@capacitor/geolocation";
import { REQUIRED_DISTANCE } from "../mockdata/missions.mockdata";
import { useGeolocation } from "../hooks/useGeolocation";
import { useMissions } from "../hooks/useMissions";

function distanceInMeters(start: Position, current: Position): number {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const earthRadius = 6371000;
  const latitudeDelta = radians(
    current.coords.latitude - start.coords.latitude,
  );
  const longitudeDelta = radians(
    current.coords.longitude - start.coords.longitude,
  );
  const startLatitude = radians(start.coords.latitude);
  const currentLatitude = radians(current.coords.latitude);
  const haversine = Math.min(1,
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(currentLatitude) *
    Math.sin(longitudeDelta / 2) ** 2,
  );
  return earthRadius * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function MoveMission() {
  const { missions, completeMission, error: progressError } = useMissions();
  const { getCurrentPosition, watchPosition, stopWatching, error: locationError } =
    useGeolocation();
  const [distance, setDistance] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startPosition = useRef<Position | null>(null);
  const completedRef = useRef(false);
  const mission = missions.find(({ id }) => id === 2);

  const startTracking = async () => {
    if (isTracking) return;
    setError(null);
    setDistance(0);
    completedRef.current = false;
    setIsTracking(true);
    try {
      startPosition.current = await getCurrentPosition();
      await watchPosition((position) => {
        if (!startPosition.current || completedRef.current) return;
        const currentDistance = distanceInMeters(startPosition.current, position);
        setDistance(currentDistance);
        if (currentDistance >= REQUIRED_DISTANCE) {
          completedRef.current = true;
          setIsTracking(false);
          void stopWatching().catch((stopError: unknown) => {
            setError(
              stopError instanceof Error
                ? stopError.message
                : "No se pudo detener el seguimiento de ubicación.",
            );
          });
          void completeMission(2).catch((completionError: unknown) => {
            setError(
              completionError instanceof Error
                ? completionError.message
                : "No se pudo completar la misión.",
            );
          });
        }
      });
    } catch (trackingError) {
      setIsTracking(false);
      setError(
        trackingError instanceof Error
          ? trackingError.message
          : "No se pudo iniciar el seguimiento de ubicación.",
      );
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto max-w-2xl p-5 sm:p-8">
          <IonButton fill="clear" routerLink="/missions">← Mis misiones</IonButton>
          <h1 className="my-3 text-4xl font-bold">Misión 2: Movimiento</h1>
          <p>Camina hasta completar {REQUIRED_DISTANCE} metros.</p>
          <p className="my-4 text-2xl font-semibold">{Math.round(distance)} / {REQUIRED_DISTANCE} m</p>
          {mission?.status === "completed" ? (
            <IonText color="success"><p>¡Misión completada!</p></IonText>
          ) : (
            <IonButton onClick={() => void startTracking()} disabled={isTracking}>
              {isTracking ? "Recorrido en curso..." : "Iniciar recorrido"}
            </IonButton>
          )}
          {(error || locationError || progressError) && (
            <IonText color="danger"><p role="alert">{error || locationError || progressError}</p></IonText>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}
