import { Motion } from "@capacitor/motion";
import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AccelListenerEvent } from "@capacitor/motion";

export function useAccelerometer() {
  const [error, setError] = useState<string | null>(null);
  const listener = useRef<PluginListenerHandle | null>(null);

  const startListening = async (
    callback: (event: AccelListenerEvent) => void,
  ) => {
    setError(null);
    try {
      if (!Capacitor.isNativePlatform() && typeof DeviceMotionEvent !== "undefined") {
        const motionEvent = DeviceMotionEvent as typeof DeviceMotionEvent & {
          requestPermission?: () => Promise<"granted" | "denied">;
        };
        if (motionEvent.requestPermission) {
          const permission = await motionEvent.requestPermission();
          if (permission !== "granted") {
            throw new Error(
              "Permite el acceso al sensor de movimiento para completar esta misión.",
            );
          }
        }
      }
      await listener.current?.remove();
      listener.current = await Motion.addListener("accel", callback);
    } catch (motionError) {
      const message =
        motionError instanceof Error
          ? motionError.message
          : "No se pudo acceder al acelerómetro.";
      setError(message);
      throw new Error(message, { cause: motionError });
    }
  };

  const stopListening = useCallback(async () => {
    await listener.current?.remove();
    listener.current = null;
  }, []);

  useEffect(
    () => () => {
      void listener.current?.remove();
      listener.current = null;
    },
    [],
  );

  return { startListening, stopListening, error };
}
