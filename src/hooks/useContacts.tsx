import { useEffect, useState } from "react";
import type { Contact } from "../interfaces/contact.interface";
import { initialContacts } from "../mockdata/contacts.mockdata";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContacts);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
    };
    setContacts((currentContacts) => [...currentContacts, newContact]);
  };

  const deleteContact = (id: number) => {
    setContacts((currentContacts) =>
      currentContacts.filter((contact) => contact.id !== id),
    );
  };

  return {
    contacts,
    loading,
    addContact,
    deleteContact,
  };
}
