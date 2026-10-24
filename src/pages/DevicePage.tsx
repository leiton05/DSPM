import { useState } from "react";
import { Device } from "@capacitor/device";
import type { DeviceInfo, BatteryInfo } from "@capacitor/device";
import { IonButton, IonText } from "@ionic/react";
import { SensorPage } from "../components/SensorPage";

export function DevicePage() {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [battery, setBattery] = useState<BatteryInfo | null>(null);
  const [error, setError] = useState("");

  const loadInfo = async () => {
    setError("");
    try {
      const [deviceInfo, batteryInfo] = await Promise.all([
        Device.getInfo(),
        Device.getBatteryInfo(),
      ]);
      setInfo(deviceInfo);
      setBattery(batteryInfo);
    } catch (deviceError) {
      setError(
        deviceError instanceof Error
          ? deviceError.message
          : "No se pudo leer la información del dispositivo.",
      );
    }
  };

  return (
    <SensorPage
      title="Device"
      description="Consulta el sistema operativo, modelo y batería."
    >
      <IonButton onClick={() => void loadInfo()}>
        Leer información del dispositivo
      </IonButton>
      {info && (
        <p role="status">
          Plataforma: {info.platform}
          <br />
          Sistema: {info.operatingSystem} {info.osVersion}
          <br />
          Modelo: {info.model}
          <br />
          Fabricante: {info.manufacturer}
          <br />
          Batería:{" "}
          {battery?.batteryLevel === undefined
            ? "No disponible"
            : `${Math.round(battery.batteryLevel * 100)}%`}
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
