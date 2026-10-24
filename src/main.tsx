import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import App from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./index.css";

setupIonicReact();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <IonApp>
        <IonReactRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </IonReactRouter>
      </IonApp>
    </AuthProvider>
  </StrictMode>,
);
