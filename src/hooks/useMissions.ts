import { useContext } from "react";
import { MissionContext } from "../context/missionContextValue";

export function useMissions() {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error("useMissions debe usarse dentro de MissionProvider.");
  }
  return context;
}
