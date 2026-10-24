import { IonButton, IonContent, IonPage } from "@ionic/react";
import { PageLoader } from "../components/PageLoader";
import { ProgressSummary } from "../components/ProgressSummary";
import { useMissions } from "../hooks/useMissions";

export function Results() {
  const { missions, points, completedCount, progress, loading } = useMissions();
  if (loading) return <PageLoader />;
  const isComplete = progress === 100;

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto max-w-2xl p-5 sm:p-8">
          <IonButton fill="clear" routerLink="/missions">← Mis misiones</IonButton>
          <h1 className="my-3 text-4xl font-bold">Resultados</h1>
          <ProgressSummary
            points={points}
            completedCount={completedCount}
            progress={progress}
            totalMissions={missions.length}
          />
          <p className="my-5 text-xl font-semibold">
            {isComplete ? "¡Completado!" : "En progreso"}
          </p>
          <IonButton routerLink="/ranking">Ver ranking</IonButton>
        </main>
      </IonContent>
    </IonPage>
  );
}
