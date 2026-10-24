import { useState } from "react";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { IonButton, IonText } from "@ionic/react";
import { SensorPage } from "../components/SensorPage";

const filePath = "sensor-demo.txt";

export function FilesystemPage() {
  const [contents, setContents] = useState("");
  const [error, setError] = useState("");

  const saveAndRead = async () => {
    setError("");
    try {
      await Filesystem.writeFile({
        path: filePath,
        data: "Archivo de prueba de Capacitor Filesystem.",
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      const result = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      setContents(
        typeof result.data === "string"
          ? result.data
          : await result.data.text(),
      );
    } catch (filesystemError) {
      setError(
        filesystemError instanceof Error
          ? filesystemError.message
          : "No se pudo acceder al sistema de archivos.",
      );
    }
  };

  return (
    <SensorPage
      title="Filesystem"
      description="Escribe y lee un archivo de texto en el almacenamiento privado de la app."
    >
      <IonButton onClick={() => void saveAndRead()}>
        Guardar y leer archivo
      </IonButton>
      {contents && <p role="status">{contents}</p>}
      {error && (
        <IonText color="danger">
          <p role="alert">{error}</p>
        </IonText>
      )}
    </SensorPage>
  );
}
