import { IonCard, IonCardContent } from "@ionic/react";
import type { RankingEntry } from "../interfaces/mission.interface";

interface RankingListProps {
  entries: RankingEntry[];
  currentUserId: string | null;
  startPosition?: number;
}

export function RankingList({
  entries,
  currentUserId,
  startPosition = 1,
}: RankingListProps) {
  return (
    <ol className="grid gap-3">
      {entries.map((entry, index) => (
        <li key={entry.uid}>
          <IonCard color={entry.uid === currentUserId ? "light" : undefined}>
            <IonCardContent className="flex items-center justify-between gap-3">
              <span>
                <strong>{startPosition + index}.</strong> {entry.name}
                {entry.uid === currentUserId ? " (Tú)" : ""}
              </span>
              <strong>{entry.points} pts</strong>
            </IonCardContent>
          </IonCard>
        </li>
      ))}
    </ol>
  );
}
