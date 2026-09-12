import type { Patient } from "../interfaces/patient.interface";

interface PatientCardProps {
  patient: Patient;
  onDelete: (id: number) => void;
}

export function PatientCard({ patient, onDelete }: PatientCardProps) {
  return (
    <li className="flex items-center gap-4 justify-between w-full items-center rounded-lg bg-white p-4 text-left shadow-sm">
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-gray-900">
          {patient.name} {patient.lastname}
        </p>
        <p className="text-gray-600">{patient.idDocument}</p>
        {patient.phone && <p className="text-gray-600">{patient.phone}</p>}
      </div>
      <div className="flex w-full justify-between items-center gap-4 justify-end">
        <label>
          <input
            type="checkbox"
            className="w-5 h-5 accent-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
          />
        </label>
        <button
          type="button"
          onClick={() => onDelete(patient.id)}
          className="shrink-0 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          aria-label={`Borrar paciente ${patient.name}`}
        >
          Borrar
        </button>
      </div>
    </li>
  );
}
