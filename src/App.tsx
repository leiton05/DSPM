import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Patients } from "./pages/Patients";

function App() {
  return (
    <>
      <Routes>
        {/* Rutas publicas */}
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path={"/administrate"} element={<Patients />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
