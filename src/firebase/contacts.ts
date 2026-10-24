import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseFirestore } from "./firebase";
import type { Contact } from "../interfaces/contact.interface";

function getContactsCollection(userId: string) {
  return collection(getFirebaseFirestore(), "users", userId, "contacts");
}

export function subscribeToContacts(
  userId: string,
  onContacts: (contacts: Contact[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    getContactsCollection(userId),
    (snapshot) => {
      onContacts(
        snapshot.docs.map((contactDocument) => ({
          id: contactDocument.id,
          ...(contactDocument.data() as Omit<Contact, "id">),
        })),
      );
    },
    onError,
  );
}

export async function createContact(
  userId: string,
  contact: Omit<Contact, "id">,
) {
  await addDoc(getContactsCollection(userId), contact);
}

export async function removeContact(userId: string, contactId: string) {
  await deleteDoc(
    doc(getFirebaseFirestore(), "users", userId, "contacts", contactId),
  );
}
