import { useState } from "react";
import type { Patient } from "../interfaces/patient.interface";
import { PatientCard } from "./PatientCard";

interface PatientSearchProps {
  patients: Patient[];
  onDelete: (id: number) => void;
}

export function PatientSearch({ patients, onDelete }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra por nombre, apellido o documento (CC)
  const filteredPatients = patients.filter((patient) => {
    const query = searchTerm.toLowerCase().trim();
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.lastname.toLowerCase().includes(query) ||
      patient.idDocument.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Campo de Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por Nombre, Apellido o CC..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white shadow-sm"
      />

      {/* Lista de Resultados */}
      <ul className="flex w-full flex-col gap-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 py-4 italic">
            No se encontraron pacientes que coincidan.
          </p>
        )}
      </ul>
    </div>
  );
}
