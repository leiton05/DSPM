import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { useState } from "react";

export function useCamera() {
  const [error, setError] = useState<string | null>(null);

  const takePhoto = async (): Promise<string> => {
    setError(null);
    try {
      if (Capacitor.isNativePlatform()) {
        let permission = await Camera.checkPermissions();
        if (permission.camera !== "granted" && permission.camera !== "limited") {
          permission = await Camera.requestPermissions({
            permissions: ["camera"],
          });
        }
        if (
          permission.camera !== "granted" &&
          permission.camera !== "limited"
        ) {
          throw new Error(
            "Permite el acceso a la cámara en los ajustes del dispositivo.",
          );
        }
      }
      const photo = await Camera.getPhoto({
        quality: 65,
        width: 1280,
        height: 1280,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        saveToGallery: true,
        webUseInput: false,
      });
      if (!photo.dataUrl) {
        throw new Error("La cámara no devolvió una fotografía.");
      }
      return photo.dataUrl;
    } catch (cameraError) {
      const message =
        cameraError instanceof Error
          ? cameraError.message
          : "No se pudo tomar la fotografía. Revisa los permisos de cámara.";
      setError(message);
      throw new Error(message, { cause: cameraError });
    }
  };

  return { takePhoto, error };
}
