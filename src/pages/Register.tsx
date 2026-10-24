import { IonContent, IonPage } from "@ionic/react";
import { RegisterForm } from "../components/RegisterForm";
import icon from "/icon-192.png";

function Register() {
  return (
    <IonPage>
      <IonContent fullscreen>
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
              <h1 className="text-8xl text-red-500 font-bold mb-6">
                Crear cuenta
              </h1>
              <p className="text-2xl">Regístrate para guardar tus tareas.</p>
              <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Register;
