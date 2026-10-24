import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IonButton, IonText } from "@ionic/react";
import { getAuthErrorMessage } from "../firebase/authErrors";

export function LoginForm() {
  const { login, authError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/tasks");
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center space-y-10 w-full"
      >
        <div>
          <div className="form-div">
            <div>
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="Escribe tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div>
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                type="password"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            {/* Valida si hay un error, y en caso de que si,
        muestra el contenido de error */}
            <div>
              {(error || authError) && (
                <IonText color="danger">
                  <p className="error-message-login" role="alert">
                    {error || authError}
                  </p>
                </IonText>
              )}
            </div>
          </div>
          <IonButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </IonButton>
          <p>
            ¿Aún no tienes una cuenta?{" "}
            <IonButton routerLink="/register" fill="clear" type="button">
              Regístrate
            </IonButton>
          </p>
        </div>
      </form>
    </>
  );
}
