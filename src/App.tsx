import { IonRouterOutlet } from "@ionic/react";
import { Navigate, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { GeolocationPage } from "./pages/Geolocation";
import { CameraPage } from "./pages/CameraPage";
import { MotionPage } from "./pages/MotionPage";
import { DevicePage } from "./pages/DevicePage";
import { HapticsPage } from "./pages/HapticsPage";
import { FilesystemPage } from "./pages/FilesystemPage";
import { LocalNotificationsPage } from "./pages/LocalNotificationsPage";
import { PushNotificationsPage } from "./pages/PushNotificationsPage";

function App() {
  return (
    <IonRouterOutlet>
      <Route path="/" element={<Home />} />
      <Route path="/sensors/geolocation" element={<GeolocationPage />} />
      <Route path="/sensors/camera" element={<CameraPage />} />
      <Route path="/sensors/motion" element={<MotionPage />} />
      <Route path="/sensors/device" element={<DevicePage />} />
      <Route path="/sensors/haptics" element={<HapticsPage />} />
      <Route path="/sensors/filesystem" element={<FilesystemPage />} />
      <Route
        path="/sensors/local-notifications"
        element={<LocalNotificationsPage />}
      />
      <Route
        path="/sensors/push-notifications"
        element={<PushNotificationsPage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </IonRouterOutlet>
  );
}

export default App;
