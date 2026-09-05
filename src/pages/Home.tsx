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
          <h1 className="text-8xl text-red-500 font-bold mb-6">Kitty-Tasks</h1>
          <p className="text-4xl">
            Bienvenido a <strong>Kitty-Tasks</strong>
          </p>
          <p className="text-2xl">
            Lugar donde puedes administrar tus queridas <strong>tareas</strong>{" "}
            :D
          </p>

          <Link to={"/tasks"} className="className=mt-8 text-4xl font-bold">
            <button className="mt-6">Ingresar</button>
          </Link>
        </div>
      </div>
    </>
  );
}
