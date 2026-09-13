import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import Hub from "./pages/Hub";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <IonRouterOutlet>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/hub/*"
            element={
              <PrivateRoute>
                <Hub />
              </PrivateRoute>
            }
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
