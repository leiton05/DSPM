import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { Navigate, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";

import { Visits } from "./Visits";
import { Patients } from "./Patients";
import { Profile } from "./Profile";

function Hub() {
  return (
    <IonTabs>
      <Navbar
        title="MediClinic"
        imgUrl="/src/assets/svg/sun.svg"
        alt="Imagen de un sol morado"
      />

      <IonRouterOutlet>
        <Route path="/hub" element={<Navigate to="/hub/visits" replace />} />

        <Route path="/hub/visits" element={<Visits />} />

        <Route path="/hub/patients" element={<Patients />} />

        <Route path="/hub/profile" element={<Profile />} />
      </IonRouterOutlet>

      <TabBar />
    </IonTabs>
  );
}

export default Hub;
