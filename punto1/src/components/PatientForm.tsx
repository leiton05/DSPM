import { useState } from "react";

interface PatientsFormProps {
  addPatient: (
    name: string,
    lastname: string,
    idDocument: string,
    phone: string,
  ) => void;
}

export function PatientsForm({ addPatient }: PatientsFormProps) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addPatient(name, lastname, idDocument, phone);

    setName("");
    setLastname("");
    setIdDocument("");
    setPhone("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center space-y-10 w-full"
    >
      <input
        type="text"
        required
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <input
        type="text"
        required
        placeholder="Apellido"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <input
        type="text"
        required
        placeholder="CC"
        value={idDocument}
        onChange={(e) => setIdDocument(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <input
        type="tel"
        placeholder="Teléfono (opcional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Agregar
      </button>
    </form>
  );
}
