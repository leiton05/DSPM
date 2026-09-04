import mailBox from "../assets/svg/mailBox.svg";
import { ContactCard } from "../components/ContactCard";
import { ContactForm } from "../components/ContactForm";
import Navbar from "../components/Navbar";
import { PageLoader } from "../components/PageLoader";
import { useContacts } from "../hooks/useContacts";

export function Contacts() {
  const { loading, contacts, addContact, deleteContact } = useContacts();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar
        title="Contactos"
        imgUrl={mailBox}
        alt="Imagen de un buzón de mensajes morado"
      />
      <main className="flex">
        <div className="justify-center text-center w-1/2">
          <h2 className="text-4xl font-bold mb-15 mt-15">Añade a alguien</h2>
          <div className=" flex justify-center items-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
            <ContactForm addContact={addContact} />
          </div>
        </div>
        <div className="justify-center text-center w-1/2">
          <h2 className="text-4xl font-bold mb-15 mt-15">Contactos</h2>
          <div className="flex justify-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
            <ul className="flex w-full flex-col gap-3">
              {contacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onDelete={deleteContact}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
