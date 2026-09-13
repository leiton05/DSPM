import type { Patient } from "./patient.interface";
import type { VisitState } from "../mockdata/estate.visit";

export interface Visit {
  id: number;
  patient: Patient;
  time: string;
  state: VisitState;
}
