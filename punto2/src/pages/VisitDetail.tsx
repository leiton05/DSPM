import { IonContent, IonPage } from "@ionic/react";
import { useVisits } from "../hooks/useVisits";
import { useParams } from "react-router-dom";
import pfp from "../assets/png/pfp.png";
import type { VisitState } from "../mockdata/estate.visit";

export function VisitDetail() {
  const { id } = useParams<{ id: string }>();
  const { getVisitById, updateVisitStatus } = useVisits();
  const visit = getVisitById(Number(id));

  if (!visit) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>Visita no encontrada.</p>
        </IonContent>
      </IonPage>
    );
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value as VisitState;
    updateVisitStatus(visit.id, newState);
  };

  return (
    <>
      <IonPage>
        <IonContent>
          <div className="mt-16">
            <div className="flex flex-col items-center text-center w-full">
              <h2 className="m-10 text-1xl">
                Visita de {visit.patient.name} {visit.patient.lastname}
              </h2>
              <div className="flex justify-center items-center text-center w-full">
                <img
                  src={pfp}
                  alt="Imagen de perfil morada"
                  className="w-60 m-15"
                />
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl">
                      {visit.patient.name} {visit.patient.lastname}
                    </h2>
                    <p>{visit.patient.idDocument}</p>
                  </div>
                  <p>Hora: {visit.time}</p>
                  <select value={visit.state} onChange={handleStateChange}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_camino">En Camino</option>
                    <option value="finalizada">Finalizada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
