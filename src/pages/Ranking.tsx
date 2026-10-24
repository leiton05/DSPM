import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { PageLoader } from "../components/PageLoader";
import { RankingList } from "../components/RankingList";
import { getFirebaseDatabase } from "../firebase/firebase";
import { useAuth } from "../hooks/useAuth";
import { useMissions } from "../hooks/useMissions";
import type { RankingEntry } from "../interfaces/mission.interface";

export function Ranking() {
  const { userId } = useAuth();
  const { points } = useMissions();
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const snapshot = await get(ref(getFirebaseDatabase(), "ranking"));
        if (!active) return;
        const values = snapshot.val() as
          | Record<string, { name?: string; points?: number }>
          | null;
        const sorted = Object.entries(values ?? {})
          .map(([uid, value]) => ({
            uid,
            name: value.name ?? "Usuario",
            points: Number(value.points) || 0,
          }))
          .sort(
            (left, right) =>
              right.points - left.points || left.name.localeCompare(right.name),
          );
        setEntries(sorted);
        setError(null);
      } catch (loadError) {
        if (!active) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar el ranking.",
        );
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [points]);

  if (loading) return <PageLoader />;
  const userIndex = entries.findIndex((entry) => entry.uid === userId);
  const userIsInTopFive = userIndex >= 0 && userIndex < 5;

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="mx-auto max-w-2xl p-5 sm:p-8">
          <IonButton fill="clear" routerLink="/missions">← Mis misiones</IonButton>
          <h1 className="my-3 text-4xl font-bold">Ranking: Top 5</h1>
          {error && <IonText color="danger"><p role="alert">{error}</p></IonText>}
          {entries.length === 0 ? (
            <p>Aún no hay puntuaciones en el ranking.</p>
          ) : (
            <RankingList entries={entries.slice(0, 5)} currentUserId={userId} />
          )}
          {!userIsInTopFive && userIndex >= 0 && (
            <section className="mt-6">
              <h2 className="mb-2 text-xl font-semibold">Tu posición</h2>
              <RankingList
                entries={[entries[userIndex]]}
                currentUserId={userId}
                startPosition={userIndex + 1}
              />
              <p>Posición {userIndex + 1} · {entries[userIndex].points} puntos</p>
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}
