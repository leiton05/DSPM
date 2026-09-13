import { createContext, useState, type ReactNode } from "react";
import type { Visit } from "../Interfaces/visit.interface";
import type { VisitState } from "../mockdata/estate.visit";
import { mockVisits } from "../mockdata/visits.mockdata";

interface VisitsContextType {
  visits: Visit[];
  updateVisitStatus: (patientId: number, newState: VisitState) => void;
  getVisitById: (patientId: number) => Visit | undefined;
}

export const VisitsContext = createContext<VisitsContextType | undefined>(
  undefined,
);

export function VisitsProvider({ children }: { children: ReactNode }) {
  // Inicializa el estado buscando en localStorage o usando el mockData
  const [visits, setVisits] = useState<Visit[]>(() => {
    const saved = localStorage.getItem("visits_list");
    return saved ? JSON.parse(saved) : mockVisits;
  });

  // Cambia el estado de una visita y guarda en localStorage
  const updateVisitStatus = (visitId: number, newState: VisitState) => {
    const updatedVisits = visits.map((visit) =>
      visit.id === visitId ? { ...visit, state: newState } : visit,
    );
    setVisits(updatedVisits);
    localStorage.setItem("visits_list", JSON.stringify(updatedVisits));
  };

  // Busca una visita por el ID del paciente
  const getVisitById = (visitId: number): Visit | undefined => {
    return visits.find((visit) => visit.id === visitId);
  };

  return (
    <VisitsContext.Provider value={{ visits, updateVisitStatus, getVisitById }}>
      {children}
    </VisitsContext.Provider>
  );
}
