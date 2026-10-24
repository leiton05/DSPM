import { LoginForm } from "../components/LoginForm";
import icon from "/icon-192.png";
import { IonButton, IonContent, IonPage } from "@ionic/react";

function Login() {
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
            </div>
          </div>
        </div>
        <IonButton
          routerLink="/"
          className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6"
        >
          Inicio
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Login;
