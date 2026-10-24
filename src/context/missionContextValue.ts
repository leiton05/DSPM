import { createContext } from "react";
import type { Mission } from "../interfaces/mission.interface";

export interface MissionContextValue {
  missions: Mission[];
  points: number;
  completedCount: number;
  progress: number;
  completeMission: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const MissionContext = createContext<MissionContextValue | null>(null);
