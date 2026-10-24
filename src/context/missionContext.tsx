import { get, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getFirebaseDatabase } from "../firebase/firebase";
import { useAuth } from "../hooks/useAuth";
import { useLocalNotifications } from "../hooks/useLocalNotifications";
import { createInitialMissions } from "../mockdata/missions.mockdata";
import type {
  Mission,
  MissionProgress,
  SavedMissionProgress,
} from "../interfaces/mission.interface";
import { MissionContext } from "./missionContextValue";

interface MissionProviderProps {
  children: ReactNode;
}

function progressFromMissions(missions: Mission[]): MissionProgress {
  return {
    points: missions.reduce(
      (total, mission) =>
        total + (mission.status === "completed" ? mission.points : 0),
      0,
    ),
    missions: missions.map(({ id, status }) => ({
      id,
      completed: status === "completed",
    })),
  };
}

function restoreMissions(saved: unknown): Mission[] {
  const initial = createInitialMissions();
  if (
    !saved ||
    typeof saved !== "object" ||
    !("missions" in saved) ||
    !Array.isArray(saved.missions)
  ) {
    return initial;
  }

  const completedIds = new Set(
    (saved.missions as SavedMissionProgress[])
      .filter(
        (mission) =>
          typeof mission?.id === "number" && mission.completed === true,
      )
      .map((mission) => mission.id),
  );
  const movementCompleted = completedIds.has(2);
  return initial.map((mission) => ({
    ...mission,
    status: completedIds.has(mission.id)
      ? "completed"
      : mission.id === 3 && !movementCompleted
        ? "locked"
        : "pending",
  }));
}

export function MissionProvider({ children }: MissionProviderProps) {
  const { userId, userEmail } = useAuth();
  const { notify } = useLocalNotifications();
  const [missions, setMissions] = useState(createInitialMissions);
  const [progressUserId, setProgressUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);
  const missionsRef = useRef(missions);

  useEffect(() => {
    let active = true;
    if (!userId) {
      missionsRef.current = createInitialMissions();
      setMissions(missionsRef.current);
      setProgressUserId(null);
      setLoading(false);
      setError(null);
      return;
    }

    const localKey = `missions_${userId}`;
    let localMissions = createInitialMissions();
    try {
      const localValue = localStorage.getItem(localKey);
      if (localValue) localMissions = restoreMissions(JSON.parse(localValue));
    } catch (storageError) {
      setError(
        storageError instanceof Error
          ? `No se pudo leer el progreso local: ${storageError.message}`
          : "No se pudo leer el progreso local.",
      );
    }
    missionsRef.current = localMissions;
    setMissions(localMissions);
    setProgressUserId(userId);
    setLoading(true);

    void (async () => {
      let restored = localMissions;
      let loadedFromFirebase = false;
      try {
        const snapshot = await get(
          ref(getFirebaseDatabase(), `users/${userId}/progress`),
        );
        if (!active) return;
        restored = snapshot.exists()
          ? restoreMissions(snapshot.val())
          : localMissions;
        const progressData = progressFromMissions(restored);
        if (!snapshot.exists()) {
          await set(
            ref(getFirebaseDatabase(), `users/${userId}/progress`),
            progressData,
          );
        }
        loadedFromFirebase = true;
      } catch (loadError) {
        if (!active) return;
        setError(
          loadError instanceof Error
            ? `No se pudo cargar Firebase; se usa el progreso local. ${loadError.message}`
            : "No se pudo cargar Firebase; se usa el progreso local.",
        );
      }

      if (!active) return;
      missionsRef.current = restored;
      setMissions(restored);
      if (loadedFromFirebase) {
        try {
          const progressData = progressFromMissions(restored);
          await set(ref(getFirebaseDatabase(), `ranking/${userId}`), {
            name: userEmail?.split("@")[0] || "Usuario",
            points: progressData.points,
          });
          if (active) setError(null);
        } catch (rankingError) {
          if (active) {
            setError(
              rankingError instanceof Error
                ? `No se pudo actualizar el ranking: ${rankingError.message}`
                : "No se pudo actualizar el ranking.",
            );
          }
        }
      }
      if (active) setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [userEmail, userId]);

  const completeMission = async (id: number) => {
    if (!userId || progressUserId !== userId) {
      throw new Error("Inicia sesión para guardar el progreso de la misión.");
    }
    const current = missionsRef.current;
    const target = current.find((mission) => mission.id === id);
    if (!target || target.status === "locked") {
      throw new Error("Esta misión todavía está bloqueada.");
    }
    if (target.status === "completed") return;

    const updated = current.map((mission) => {
      if (mission.id === id) return { ...mission, status: "completed" as const };
      if (id === 2 && mission.id === 3 && mission.status === "locked") {
        return { ...mission, status: "pending" as const };
      }
      return mission;
    });
    missionsRef.current = updated;
    setMissions(updated);
    setError(null);
    const progressData = progressFromMissions(updated);
    const name = userEmail?.split("@")[0] || "Usuario";
    const errors: string[] = [];

    try {
      localStorage.setItem(`missions_${userId}`, JSON.stringify(progressData));
    } catch (storageError) {
      errors.push(
        storageError instanceof Error
          ? `No se pudo guardar localmente: ${storageError.message}`
          : "No se pudo guardar localmente.",
      );
    }

    try {
      const database = getFirebaseDatabase();
      await Promise.all([
        set(ref(database, `users/${userId}/progress`), progressData),
        set(ref(database, `ranking/${userId}`), {
          name,
          points: progressData.points,
        }),
      ]);
    } catch (saveError) {
      errors.push(
        saveError instanceof Error
          ? `No se pudo sincronizar con Firebase: ${saveError.message}`
          : "No se pudo sincronizar con Firebase.",
      );
    }

    try {
      await notify("Has completado una misión", `Ganaste ${target.points} puntos.`);
    } catch (notificationError) {
      errors.push(
        notificationError instanceof Error
          ? notificationError.message
          : "No se pudo enviar la notificación de misión.",
      );
    }
    const completedCount = updated.filter(
      (mission) => mission.status === "completed",
    ).length;
    if (updated.length - completedCount === 1) {
      try {
        await notify(
          "Te falta 1 misión para completar",
          "Estás muy cerca de completar todas tus misiones.",
        );
      } catch (notificationError) {
        errors.push(
          notificationError instanceof Error
            ? notificationError.message
            : "No se pudo enviar la notificación de progreso.",
        );
      }
    }
    setError(errors.length > 0 ? errors.join(" ") : null);
  };

  const visibleMissions =
    userId && progressUserId === userId ? missions : createInitialMissions();
  const completedCount = visibleMissions.filter(
    (mission) => mission.status === "completed",
  ).length;
  const points = visibleMissions.reduce(
    (total, mission) =>
      total + (mission.status === "completed" ? mission.points : 0),
    0,
  );
  const knownMissionCount = visibleMissions.length;

  return (
    <MissionContext.Provider
      value={{
        missions: visibleMissions,
        points,
        completedCount,
        progress: (completedCount / knownMissionCount) * 100,
        completeMission,
        loading: Boolean(userId && (loading || progressUserId !== userId)),
        error,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}
