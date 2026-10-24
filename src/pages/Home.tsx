import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { isLoggedIn, isLoading } = useAuth();

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <h1 className="mb-4 text-5xl font-bold">Bienvenido</h1>
          <p className="mb-6 text-xl">Completa misiones, gana puntos y sube en el ranking.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {isLoggedIn ? (
              <IonButton routerLink="/missions">Ir a mis misiones</IonButton>
            ) : (
              <>
                <IonButton routerLink="/login" disabled={isLoading}>
                  Iniciar sesión
                </IonButton>
                <IonButton routerLink="/register" disabled={isLoading}>
                  Registrarse
                </IonButton>
              </>
            )}
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
}
