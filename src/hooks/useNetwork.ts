import { useContext } from "react";
import { NetworkContext } from "../context/networkContextValue";

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork debe usarse dentro de NetworkProvider.");
  }
  return context;
}
