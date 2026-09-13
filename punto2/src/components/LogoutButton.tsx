import { IonButton } from "@ionic/react";
import { useAuth } from "../hooks/useAuth";

export function LogoutButton() {
  const { logout } = useAuth();
  return (
    <>
      <IonButton onClick={logout} fill="solid">
        Salir
      </IonButton>
    </>
  );
}
