import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import App from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { TaskProvider } from "./context/taskContext.tsx";
import { NetworkProvider } from "./context/networkContext.tsx";
import { MissionProvider } from "./context/missionContext.tsx";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

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
void defineCustomElements(window);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <NetworkProvider>
        <MissionProvider>
          <TaskProvider>
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
          </TaskProvider>
        </MissionProvider>
      </NetworkProvider>
    </AuthProvider>
  </StrictMode>,
);
