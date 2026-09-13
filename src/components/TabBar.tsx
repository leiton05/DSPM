import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";

import { calendarOutline, peopleOutline, personOutline } from "ionicons/icons";

function TabBar() {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="visits" href="/hub/visits" className="purple-gradient">
        <IonIcon icon={calendarOutline} />
        <IonLabel>Visitas</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="patients"
        href="/hub/patients"
        className="purple-gradient"
      >
        <IonIcon icon={peopleOutline} />
        <IonLabel>Pacientes</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="profile"
        href="/hub/profile"
        className="purple-gradient"
      >
        <IonIcon icon={personOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}

export default TabBar;
