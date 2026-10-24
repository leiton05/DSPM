import { IonProgressBar } from "@ionic/react";

interface ProgressSummaryProps {
  points: number;
  completedCount: number;
  progress: number;
  totalMissions: number;
}

export function ProgressSummary({
  points,
  completedCount,
  progress,
  totalMissions,
}: ProgressSummaryProps) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-soft">
      <p className="text-lg font-semibold">{points} puntos</p>
      <p>
        {completedCount} / {totalMissions} completadas
      </p>
      <IonProgressBar value={progress / 100} className="my-3" />
    </section>
  );
}
