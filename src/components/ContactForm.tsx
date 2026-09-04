interface ContactFormProps {
  addContact: (name: string, phone: string) => void;
}

export function ContactForm({ addContact }: ContactFormProps) {
  return (
    <>
      <form className="flex flex-col justify-center items-center space-y-10 w-full">
        <input
          type="text"
          placeholder="Nombre"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <input
          type="text"
          placeholder="Teléfono"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={(e) => {
            e.preventDefault();
            const nameInput = (
              e.currentTarget.form?.elements[0] as HTMLInputElement
            ).value;
            const phoneInput = (
              e.currentTarget.form?.elements[1] as HTMLInputElement
            ).value;
            addContact(nameInput, phoneInput);
          }}
        >
          Agregar
        </button>
      </form>
    </>
  );
}
