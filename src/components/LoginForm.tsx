import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  /* Basicamente el useAuth pide el contexto actual por lo que lo carga si es valida la solicitud,
  y como usa el Prop de authContext entonces devuelve un context que es el que ahora se llama login */
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    /* Al usar el boton de ingresar se reinicia la pagina, entonces este
    preventDefault evita que se recargue lo cual ayuda a que el error quede
    los 2 segundos en pantalla*/
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/tasks");
    } else {
      /* Establece un error y lo deja por 2 segundos */
      setError("Datos invalidos");
      setTimeout(() => {
        setError("");
      }, 2000);
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
              <label>Email</label>
              <input
                type="email"
                placeholder="Escribe tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div>
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            {/* Valida si hay un error, y en caso de que si,
        muestra el contenido de error */}
            <div>{error && <p className="error-message-login">{error}</p>}</div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ingresar
          </button>
        </div>
      </form>
    </>
  );
}
