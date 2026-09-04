import type { Contact } from "../interfaces/contact.interface";

interface ContactCardProps {
	contact: Contact;
	onDelete: (id: number) => void;
}

export function ContactCard({ contact, onDelete }: ContactCardProps) {
	return (
		<li className="flex w-full items-center justify-between gap-4 rounded-lg bg-white p-4 text-left shadow-sm">
			<div className="min-w-0">
				<p className="truncate text-lg font-semibold text-gray-900">
					{contact.name}
				</p>
				<p className="text-gray-600">{contact.phone}</p>
			</div>
			<button
				type="button"
				onClick={() => onDelete(contact.id)}
				className="shrink-0 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
				aria-label={`Borrar contacto ${contact.name}`}
			>
				Borrar
			</button>
		</li>
	);
}
