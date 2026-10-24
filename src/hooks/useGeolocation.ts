import {
  Geolocation,
  type Position,
} from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import { useEffect, useRef, useState } from "react";

export function useGeolocation() {
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<string | null>(null);

  const requestPermission = async () => {
    if (!Capacitor.isNativePlatform()) return;
    let permission = await Geolocation.checkPermissions();
    if (permission.location !== "granted") {
      permission = await Geolocation.requestPermissions();
    }
    if (permission.location !== "granted") {
      throw new Error(
        "Permite el acceso a la ubicación en los ajustes del dispositivo.",
      );
    }
  };

  const getCurrentPosition = async (): Promise<Position> => {
    setError(null);
    try {
      await requestPermission();
      return await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
    } catch (locationError) {
      const message =
        locationError instanceof Error
          ? locationError.message
          : "No se pudo obtener la ubicación. Revisa los permisos.";
      setError(message);
      throw new Error(message, { cause: locationError });
    }
  };

  const watchPosition = async (
    callback: (position: Position) => void,
  ): Promise<void> => {
    setError(null);
    try {
      await requestPermission();
      watchId.current = await Geolocation.watchPosition(
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
        (position, watchError) => {
          if (watchError) {
            const message = watchError.message;
            setError(message);
            return;
          }
          if (position) callback(position);
        },
      );
    } catch (locationError) {
      const message =
        locationError instanceof Error
          ? locationError.message
          : "No se pudo iniciar el seguimiento de ubicación.";
      setError(message);
      throw new Error(message, { cause: locationError });
    }
  };

  const stopWatching = async () => {
    if (watchId.current) {
      try {
        await Geolocation.clearWatch({ id: watchId.current });
        watchId.current = null;
      } catch (clearError) {
        const message =
          clearError instanceof Error
            ? clearError.message
            : "No se pudo detener el seguimiento de ubicación.";
        setError(message);
        throw new Error(message, { cause: clearError });
      }
    }
  };

  useEffect(
    () => () => {
      if (watchId.current) {
        void Geolocation.clearWatch({ id: watchId.current });
        watchId.current = null;
      }
    },
    [],
  );

  return { getCurrentPosition, watchPosition, stopWatching, error };
}
