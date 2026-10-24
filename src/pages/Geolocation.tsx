import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { IonButton, IonText } from "@ionic/react";
import type { Position } from "@capacitor/geolocation";
import { SensorPage } from "../components/SensorPage";

export function GeolocationPage() {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    setError("");
    try {
      setPosition(await Geolocation.getCurrentPosition());
    } catch (locationError) {
      setError(
        locationError instanceof Error
          ? locationError.message
          : "No se pudo obtener la ubicación.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SensorPage
      title="Geolocation"
      description="Obtiene la ubicación actual usando el GPS o el navegador."
    >
      <IonButton onClick={() => void getLocation()} disabled={loading}>
        {loading ? "Buscando..." : "Obtener ubicación"}
      </IonButton>
      {position && (
        <p role="status">
          Latitud: {position.coords.latitude}
          <br />
          Longitud: {position.coords.longitude}
          <br />
          Precisión: {position.coords.accuracy} m
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
