import type { Mission } from "../interfaces/mission.interface";

export const REQUIRED_DISTANCE = 50;
export const STAY_SECONDS = 10;

export const MISSION_DEFINITIONS: Omit<Mission, "status">[] = [
  {
    id: 1,
    title: "Evidencia",
    description: "Toma una foto para completar esta misión.",
    points: 30,
  },
  {
    id: 2,
    title: "Movimiento",
    description: `Recorre al menos ${REQUIRED_DISTANCE} metros.`,
    points: 40,
  },
  {
    id: 3,
    title: "Permanencia",
    description: `Quédate quieto durante ${STAY_SECONDS} segundos.`,
    points: 30,
  },
];

export function createInitialMissions(): Mission[] {
  return MISSION_DEFINITIONS.map((mission) => ({
    ...mission,
    status: mission.id === 3 ? "locked" : "pending",
  }));
}
