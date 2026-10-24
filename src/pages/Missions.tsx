import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { LogoutButton } from "../components/LogoutButton";
import { MissionCard } from "../components/MissionCard";
import { PageLoader } from "../components/PageLoader";
import { ProgressSummary } from "../components/ProgressSummary";
import { useMissions } from "../hooks/useMissions";

export function Missions() {
  const { missions, points, completedCount, progress, loading, error } =
    useMissions();

  if (loading) return <PageLoader />;

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto max-w-4xl p-5 sm:p-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-wide">Parcial 2</p>
              <h1 className="text-4xl font-bold">Mis misiones</h1>
            </div>
            <LogoutButton />
          </header>
          <ProgressSummary
            points={points}
            completedCount={completedCount}
            progress={progress}
            totalMissions={missions.length}
          />
          {error && (
            <IonText color="danger">
              <p className="my-4" role="alert">
                {error}
              </p>
            </IonText>
          )}
          <div className="my-4 flex flex-wrap gap-2">
            <IonButton routerLink="/results">Resultados</IonButton>
            <IonButton routerLink="/ranking">Ranking</IonButton>
          </div>
          <section className="grid gap-4 md:grid-cols-2">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
}
