import { useEffect, useState } from "react";
import type { Patient } from "../interfaces/patient.interface";
import { initialPatients } from "../mockdata/patient.mockdata";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPatients(initialPatients);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addPatient = (
    name: string,
    lastname: string,
    idDocument: string,
    phone: string,
  ) => {
    if (!name.trim() || !lastname.trim() || !idDocument.trim()) {
      console.warn("Nombre, apellido y documento son obligatorios.");
      return;
    }
    const newPatient: Patient = {
      id: Date.now(),
      name: name.trim(),
      lastname: lastname.trim(),
      idDocument: idDocument.trim(),
      phone: phone.trim(),
    };
    setPatients((currentPatients) => [...currentPatients, newPatient]);
  };

  const deletePatient = (id: number) => {
    setPatients((currentPatients) =>
      currentPatients.filter((patient) => patient.id !== id),
    );
  };

  return {
    patients,
    loading,
    addPatient,
    deletePatient,
  };
}
