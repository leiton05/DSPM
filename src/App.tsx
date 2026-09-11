import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Rutas publicas */}
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path={"/tasks"} element={<Tasks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
