import { useState } from "react";
import { Camera } from "@capacitor/camera";
import { IonButton, IonText } from "@ionic/react";
import { SensorPage } from "../components/SensorPage";

export function CameraPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState("");

  const takePhoto = async () => {
    setError("");
    try {
      const result = await Camera.takePhoto({ quality: 85 });
      setPhoto(result.webPath ?? result.uri ?? null);
    } catch (cameraError) {
      setError(
        cameraError instanceof Error
          ? cameraError.message
          : "No se pudo abrir la cámara.",
      );
    }
  };

  const choosePhoto = async () => {
    setError("");
    try {
      const result = await Camera.chooseFromGallery({ limit: 1 });
      setPhoto(result.results[0]?.webPath ?? result.results[0]?.uri ?? null);
    } catch (cameraError) {
      setError(
        cameraError instanceof Error
          ? cameraError.message
          : "No se pudo abrir la galería.",
      );
    }
  };

  return (
    <SensorPage title="Camera" description="Toma una foto o selecciónala de la galería.">
      <div className="flex flex-wrap gap-3">
        <IonButton onClick={() => void takePhoto()}>Tomar foto</IonButton>
        <IonButton onClick={() => void choosePhoto()} fill="outline">
          Abrir galería
        </IonButton>
      </div>
      {photo && <img src={photo} alt="Foto seleccionada" className="max-w-full" />}
      {error && (
        <IonText color="danger">
          <p role="alert">{error}</p>
        </IonText>
      )}
    </SensorPage>
  );
}
