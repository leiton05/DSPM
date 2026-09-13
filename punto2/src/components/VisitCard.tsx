import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import type { Visit } from "../Interfaces/visit.interface";

interface VisitCardProps {
  visit: Visit;
}

export function VisitCard({ visit }: VisitCardProps) {
  return (
    <IonCard
      className="w-full ion-no-margin text-left p-4"
      button={true}
      routerLink={`/hub/visits/${visit.patient.id}`}
    >
      <IonCardHeader>
        <IonCardTitle className="text-lg font-semibold text-gray-600">
          {visit.patient.name} {visit.patient.lastname}
        </IonCardTitle>
        <IonCardSubtitle>{visit.time}</IonCardSubtitle>
        <IonCardSubtitle>{visit.state}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}
