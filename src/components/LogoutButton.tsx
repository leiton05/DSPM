import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { IonButton, IonText } from "@ionic/react";
import { getAuthErrorMessage } from "../firebase/authErrors";

export function LogoutButton() {
  const { logout } = useAuth();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
    } catch (error) {
      setError(getAuthErrorMessage(error));
    }
  };

  return (
    <>
      <IonButton onClick={handleLogout}>Salir</IonButton>
      {error && (
        <IonText color="danger">
          <p role="alert">{error}</p>
        </IonText>
      )}
    </>
  );
}
