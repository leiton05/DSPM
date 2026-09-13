import { useEffect, useState } from "react";
import type { Patient } from "../interfaces/patient.interface";
import { initialPatients } from "../mockdata/patient.mockdata";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedPatients = localStorage.getItem("patients_list");

      if (savedPatients) {
        setPatients(JSON.parse(savedPatients));
      } else {
        setPatients(initialPatients);
        localStorage.setItem("patients_list", JSON.stringify(initialPatients));
      }

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

    setPatients((currentPatients) => {
      const updatedPatients = [...currentPatients, newPatient];

      localStorage.setItem("patients_list", JSON.stringify(updatedPatients));

      return updatedPatients;
    });
  };

  const deletePatient = (id: number) => {
    setPatients((currentPatients) => {
      const updatedPatients = currentPatients.filter(
        (patient) => patient.id !== id,
      );

      localStorage.setItem("patients_list", JSON.stringify(updatedPatients));

      return updatedPatients;
    });
  };

  return {
    patients,
    loading,
    addPatient,
    deletePatient,
  };
}
