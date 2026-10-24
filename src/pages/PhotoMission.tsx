import { useState } from "react";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { useAuth } from "../hooks/useAuth";
import { useCamera } from "../hooks/useCamera";
import { useMissions } from "../hooks/useMissions";

function loadEvidence(userId: string | null) {
  if (!userId) return { photo: null, error: null };
  try {
    return { photo: localStorage.getItem(`mission_photo_${userId}`), error: null };
  } catch (storageError) {
    return {
      photo: null,
      error:
        storageError instanceof Error
          ? `No se pudo leer la evidencia guardada: ${storageError.message}`
          : "No se pudo leer la evidencia guardada.",
    };
  }
}

export function PhotoMission() {
  const { userId } = useAuth();
  const { missions, completeMission, error: progressError } = useMissions();
  const { takePhoto, error: cameraError } = useCamera();
  const [savedEvidence] = useState(() => loadEvidence(userId));
  const [photo, setPhoto] = useState<string | null>(savedEvidence.photo);
  const [error, setError] = useState<string | null>(savedEvidence.error);
  const mission = missions.find(({ id }) => id === 1);

  const capture = async () => {
    setError(null);
    try {
      const dataUrl = await takePhoto();
      if (!userId) throw new Error("Inicia sesión para guardar tu evidencia.");
      localStorage.setItem(`mission_photo_${userId}`, dataUrl);
      setPhoto(dataUrl);
      await completeMission(1);
    } catch (captureError) {
      setError(
        captureError instanceof Error
          ? captureError.message
          : "No se pudo guardar la evidencia.",
      );
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto max-w-2xl p-5 sm:p-8">
          <IonButton fill="clear" routerLink="/missions">← Mis misiones</IonButton>
          <h1 className="my-3 text-4xl font-bold">Misión 1: Evidencia</h1>
          <p>Toma una fotografía y guárdala como evidencia de la misión.</p>
          {photo && (
            <img
              src={photo}
              alt="Evidencia fotográfica guardada"
              className="my-5 max-h-96 rounded-xl object-contain"
            />
          )}
          {mission?.status === "completed" ? (
            <IonText color="success"><p>¡Misión completada!</p></IonText>
          ) : (
            <IonButton onClick={() => void capture()}>Tomar fotografía</IonButton>
          )}
          {(error || cameraError || progressError) && (
            <IonText color="danger"><p role="alert">{error || cameraError || progressError}</p></IonText>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}
