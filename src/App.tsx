import { IonRouterOutlet } from "@ionic/react";
import { Navigate, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { EditTask } from "./pages/EditTask";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <IonRouterOutlet>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks/edit"
        element={
          <PrivateRoute>
            <EditTask />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </IonRouterOutlet>
  );
}

export default App;
