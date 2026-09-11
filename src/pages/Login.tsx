import { LoginForm } from "../components/LoginForm";
import icon from "/icon-192.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex min-h-screen items-center">
          <div>
            <img
              src={icon}
              alt="Imagen de dos piezas de rompecabezas moradas"
              className="w-100"
            />
          </div>
          <div className="w-80% m-10">
            <div>
              <h1 className="text-8xl text-red-500 font-bold mb-6">
                Iniciar Sesión
              </h1>
              <p className="text-2xl">
                Bienvenido a la pagina de Inicio de Sesión
              </p>
            </div>
            <div className=" flex justify-center items-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
              <LoginForm />
            </div>
            <div></div>
          </div>
        </div>
        <div className="">
          <Link
            to={"/"}
            className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6"
          >
            <button className="mt-6">Inicio</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
