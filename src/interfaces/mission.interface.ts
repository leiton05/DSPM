export type MissionStatus = "locked" | "pending" | "completed";

export interface Mission {
  id: number;
  title: string;
  description: string;
  points: number;
  status: MissionStatus;
}

export interface SavedMissionProgress {
  id: number;
  completed: boolean;
}

export interface MissionProgress {
  points: number;
  missions: SavedMissionProgress[];
}

export interface RankingEntry {
  uid: string;
  name: string;
  points: number;
}
