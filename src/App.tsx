import { IonRouterOutlet } from "@ionic/react";
import { Navigate, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { EditTask } from "./pages/EditTask";
import { Contacts } from "./pages/Contacts";
import { Fruits } from "./pages/Fruits";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import { Missions } from "./pages/Missions";
import { PhotoMission } from "./pages/PhotoMission";
import { MoveMission } from "./pages/MoveMission";
import { StayMission } from "./pages/StayMission";
import { Results } from "./pages/Results";
import { Ranking } from "./pages/Ranking";

function App() {
  return (
    <IonRouterOutlet>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/missions"
        element={
          <PrivateRoute>
            <Missions />
          </PrivateRoute>
        }
      />
      <Route
        path="/missions/photo"
        element={
          <PrivateRoute>
            <PhotoMission />
          </PrivateRoute>
        }
      />
      <Route
        path="/missions/move"
        element={
          <PrivateRoute>
            <MoveMission />
          </PrivateRoute>
        }
      />
      <Route
        path="/missions/stay"
        element={
          <PrivateRoute>
            <StayMission />
          </PrivateRoute>
        }
      />
      <Route
        path="/results"
        element={
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        }
      />
      <Route
        path="/ranking"
        element={
          <PrivateRoute>
            <Ranking />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <PrivateRoute>
            <Contacts />
          </PrivateRoute>
        }
      />
      <Route
        path="/fruits"
        element={
          <PrivateRoute>
            <Fruits />
          </PrivateRoute>
        }
      />
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
