import type { Patient } from "../Interfaces/patient.interface";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <li className="flex items-center gap-4 justify-between w-full items-center rounded-lg bg-white p-4 text-left shadow-sm">
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-gray-900">
          {patient.name} {patient.lastname}
        </p>
        <p className="text-gray-600">{patient.idDocument}</p>
      </div>
    </li>
  );
}
