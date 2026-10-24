import { Haptics } from "@capacitor/haptics";
import { useState } from "react";

export function useHaptics() {
  const [error, setError] = useState<string | null>(null);

  const vibrate = async () => {
    setError(null);
    try {
      await Haptics.vibrate({ duration: 500 });
    } catch (hapticsError) {
      const message =
        hapticsError instanceof Error
          ? hapticsError.message
          : "No se pudo activar la vibración.";
      setError(message);
      throw new Error(message, { cause: hapticsError });
    }
  };

  return { vibrate, error };
}
