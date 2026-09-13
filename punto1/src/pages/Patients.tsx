import sun from "../assets/svg/sun.svg";
import Navbar from "../components/Navbar";
import { PageLoader } from "../components/PageLoader";
import { PatientCard } from "../components/PatientCard";
import { PatientsForm } from "../components/PatientForm";
import { PatientSearch } from "../components/PatientSearch";
import { usePatients } from "../hooks/usePatients";
import type { Patient } from "../interfaces/patient.interface";

export function Patients() {
  const { loading, patients, addPatient, deletePatient } = usePatients();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar title="Pacientes" imgUrl={sun} alt="Imagen de un sol morado" />
      <div className="w-3/7 flex flex-col items-center gap-4 mx-auto mt-6">
        <PatientSearch patients={patients} onDelete={deletePatient} />
      </div>{" "}
      <main className="flex">
        <div className="justify-center text-center w-1/2">
          <h2 className="text-4xl font-bold mb-15 mt-15">Agrega un paciente</h2>
          <div className=" flex justify-center items-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
            <PatientsForm addPatient={addPatient} />
          </div>
        </div>
        <div className="justify-center text-center w-1/2">
          <h2 className="text-4xl font-bold mb-15 mt-15">Pacientes</h2>
          <div className="flex justify-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
            <ul className="flex w-full flex-col gap-3">
              {patients.map((patient: Patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onDelete={deletePatient}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
