import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import type { Patient } from "../Interfaces/patient.interface";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <IonCard className="w-full ion-no-margin text-left p-4">
      <IonCardHeader>
        <IonCardTitle className="text-lg font-semibold text-gray-600">
          {patient.name} {patient.lastname}
        </IonCardTitle>
        <IonCardSubtitle>{patient.idDocument}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}
