import { IonPage, IonContent, IonButton } from "@ionic/react";
import { LoginForm } from "../components/LoginForm";
import icon from "../assets/svg/sun.svg";

function Login() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="flex min-h-full items-center justify-center">
          <div className="flex items-center">
            <div>
              <img
                src={icon}
                alt="Imagen de dos piezas de rompecabezas moradas"
                className="w-40"
                loading="lazy"
              />
            </div>
            <div className="m-10">
              <div>
                <h1 className="text-5xl text-red-500 font-bold mb-6">
                  Iniciar Sesión
                </h1>
                <p className="text-2xl">
                  Bienvenido a la página de Inicio de Sesión
                </p>
              </div>
              <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6 shadow-md w-7/8 mx-auto mt-4">
                <LoginForm />
              </div>
            </div>
          </div>

          <IonButton
            routerLink="/"
            fill="clear"
            className="fixed right-4 bottom-4"
          >
            Inicio
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
