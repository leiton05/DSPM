import sun from "../assets/svg/sun.svg";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center">
        <div className="flex w-3/7 m-10 justify-end">
          <img src={sun} alt="Imagen de un sol morado" className="w-100" />
        </div>
        <div className="w-4/7 m-10">
          <h1 className="text-6xl text-red-500 font-bold mb-6">MediClinic</h1>
          <p className="text-3xl">
            Bienvenido a <strong>MediClinic</strong>
          </p>
          <p className="text-xl">
            Centro de salud que ofrece los siguientes serivcios:
          </p>

          <Link to={"/login"} className="className=mt-8 text-2xl font-bold">
            <button className="mt-6">Administrar</button>
          </Link>
        </div>
      </div>
    </>
  );
}
