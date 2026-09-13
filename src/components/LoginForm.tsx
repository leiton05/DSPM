import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IonInput, IonButton, IonItem, IonList, IonText } from "@ionic/react";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/hub");
    } else {
      setError("Datos inválidos");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4">
      <IonList inset={true} className="ion-no-margin">
        <IonItem>
          <IonInput
            label="Email"
            labelPlacement="floating"
            type="email"
            placeholder="Escribe tu correo"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            type="password"
            placeholder="Escribe tu contraseña"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
      </IonList>

      {error && (
        <div className="ion-padding-top text-center">
          <IonText color="danger">
            <p className="text-sm font-semibold">{error}</p>
          </IonText>
        </div>
      )}

      <IonButton type="submit" expand="block" className="mt-6">
        Ingresar
      </IonButton>
    </form>
  );
}
