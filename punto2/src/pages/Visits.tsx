import { IonContent, IonPage } from "@ionic/react";
import { VisitCard } from "../components/VisitCard";
import { useVisits } from "../hooks/useVisits";

export function Visits() {
  const { visits } = useVisits();

  return (
    <>
      <IonPage>
        <IonContent>
          <div className="mt-16">
            <div className="flex flex-col items-center text-center w-full">
              <h2 className="m-10 text-2xl">Visitas de hoy</h2>
              <div>
                <ul className="w-full space-y-8 p-0">
                  {visits.map((visit) => (
                    <VisitCard key={visit.id} visit={visit} />
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
