import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import type { Mission } from "../interfaces/mission.interface";

interface MissionCardProps {
  mission: Mission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const destination = {
    1: "/missions/photo",
    2: "/missions/move",
    3: "/missions/stay",
  }[mission.id];

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {mission.id}. {mission.title}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{mission.description}</p>
        <p className="my-2 font-semibold">{mission.points} puntos</p>
        <p className="mb-3">
          {mission.status === "completed"
            ? "Completada"
            : mission.status === "locked"
              ? "Bloqueada"
              : "Pendiente"}
        </p>
        <IonButton
          routerLink={destination}
          disabled={mission.status !== "pending"}
        >
          {mission.status === "completed"
            ? "Completada"
            : mission.status === "locked"
              ? "Bloqueada"
              : "Abrir misión"}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}
