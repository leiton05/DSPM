import mailBox from "../assets/svg/mailBox.svg";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center">
        <div className="flex w-3/7 m-10 justify-end">
          <img
            src={mailBox}
            alt="Imagen de un buzón de mensajes morado"
            className="w-150"
          />
        </div>
        <div className="w-4/7 m-10">
          <h1 className="text-8xl text-red-500 font-bold mb-6">Kitty-Calls</h1>
          <p className="text-4xl">
            Bienvenido a <strong>Kitty-Calls</strong>
          </p>
          <p className="text-2xl">
            Lugar donde puedes guardar de forma tranquila tus queridos{" "}
            <strong>contactos</strong> :D
          </p>

          <Link to={"/contacts"} className="className=mt-8 text-4xl font-bold">
            <button className="mt-6">Ingresar</button>
          </Link>
        </div>
      </div>
    </>
  );
}
