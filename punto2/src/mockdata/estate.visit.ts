export const VISIT_STATE = {
  pendiente: "pendiente",
  en_camino: "en camino",
  finalizada: "finalizada",
};

export type VisitState = (typeof VISIT_STATE)[keyof typeof VISIT_STATE];
