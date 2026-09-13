import { IonHeader, IonToolbar, IonButtons, IonButton } from "@ionic/react";
import { LogoutButton } from "./LogoutButton";

interface NavbarProp {
  title: string;
  imgUrl: string;
  alt: string;
}

function Navbar({ title, imgUrl, alt }: NavbarProp) {
  return (
    <IonHeader>
      <IonToolbar className="px-10 flex items-center justify-between">
        <IonButtons slot="start">
          <IonButton routerLink="/">Inicio</IonButton>
        </IonButtons>

        <div className="flex items-center justify-center gap-3">
          <img
            src={imgUrl}
            alt={alt}
            className="w-16 h-8 sm:w-10 sm:h-10 object-contain"
          />

          <h1 className="text-2xl sm:text-2xl font-bold">{title}</h1>
        </div>

        <IonButtons slot="end">
          <LogoutButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}

export default Navbar;
