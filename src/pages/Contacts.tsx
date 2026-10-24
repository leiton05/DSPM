import { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
} from "@ionic/react";
import mailBox from "../assets/svg/mailBox.svg";
import Navbar from "../components/Navbar";
import { createContact, removeContact, subscribeToContacts } from "../firebase/contacts";
import type { Contact } from "../interfaces/contact.interface";
import { useAuth } from "../hooks/useAuth";
import { useNetwork } from "../hooks/useNetwork";

export function Contacts() {
  const { userId } = useAuth();
  const { isOnline } = useNetwork();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsUserId, setContactsUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId || !isOnline) {
      return;
    }

    let active = true;
    let unsubscribe: (() => void) | undefined;
    void Promise.resolve().then(() => {
      if (!active) return;
      try {
        unsubscribe = subscribeToContacts(
          userId,
          (nextContacts) => {
            if (!active) return;
            setContacts(nextContacts);
            setContactsUserId(userId);
            setLoading(false);
            setError("");
          },
          (subscriptionError) => {
            if (!active) return;
            setContactsUserId(userId);
            setError(subscriptionError.message);
            setLoading(false);
          },
        );
        if (!active) unsubscribe?.();
      } catch (subscriptionError) {
        if (!active) return;
        setContactsUserId(userId);
        setError(
          subscriptionError instanceof Error
            ? subscriptionError.message
            : "No se pudieron cargar los contactos.",
        );
        setLoading(false);
      }
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [isOnline, userId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId || !isOnline) return;

    setIsSaving(true);
    setError("");
    try {
      await createContact(userId, { name: name.trim(), email: email.trim(), phone: phone.trim() });
      setName("");
      setEmail("");
      setPhone("");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "No se pudo guardar el contacto.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!userId || !isOnline) return;
    setError("");
    try {
      await removeContact(userId, contactId);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "No se pudo borrar el contacto.",
      );
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar title="Contactos" imgUrl={mailBox} alt="Buzón morado" />
        <main className="mx-auto w-11/12 max-w-3xl p-4">
          <h2 className="mb-6 text-center text-4xl font-bold">Contactos</h2>
          {!isOnline && (
            <IonText color="warning">
              <p role="status">Conéctate a internet para usar Contactos.</p>
            </IonText>
          )}
          {error && (
            <IonText color="danger">
              <p role="alert">{error}</p>
            </IonText>
          )}
          <form
            onSubmit={handleSubmit}
            className="mb-8 flex flex-col gap-4 rounded-lg bg-gray-100 p-6 shadow-md"
          >
            <input
              aria-label="Nombre del contacto"
              placeholder="Nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              disabled={!isOnline || isSaving}
            />
            <input
              aria-label="Correo del contacto"
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={!isOnline || isSaving}
            />
            <input
              aria-label="Teléfono del contacto"
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={!isOnline || isSaving}
            />
            <IonButton type="submit" disabled={!isOnline || isSaving}>
              {isSaving ? "Guardando..." : "Agregar contacto"}
            </IonButton>
          </form>
          {userId && isOnline && (loading || contactsUserId !== userId) ? (
            <p role="status">Cargando contactos...</p>
          ) : (
            <ul className="flex flex-col gap-3">
                {(userId && contactsUserId === userId ? contacts : []).map(
                  (contact) => (
                  <li
                  key={contact.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p>{contact.email}</p>
                    {contact.phone && <p>{contact.phone}</p>}
                  </div>
                  <IonButton
                    color="danger"
                    disabled={!isOnline}
                    onClick={() => void handleDelete(contact.id)}
                  >
                    Borrar
                  </IonButton>
                </li>
                ),
              )}
            </ul>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}
