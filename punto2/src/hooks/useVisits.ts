import { useContext } from "react";
import { VisitsContext } from "../context/visitsContext";

export const useVisits = () => {
  const context = useContext(VisitsContext);
  if (!context) {
    throw new Error("useVisits debe usarse dentro de un VisitsProvider");
  }
  return context;
};
