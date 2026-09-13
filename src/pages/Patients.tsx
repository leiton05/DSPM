import { IonContent, IonPage } from "@ionic/react";
import { mockPatients } from "../mockdata/patients.mockdata";
import { PatientCard } from "../components/PatientCard";

export function Patients() {
  return (
    <>
      <IonPage>
        <IonContent>
          <div className="mt-16">
            <div className="flex flex-col items-center text-center w-full">
              <h2 className="m-10 text-2xl">Lista de pacientes</h2>
              <div>
                <ul className="w-full space-y-8 p-0">
                  {mockPatients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
