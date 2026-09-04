import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/contacts"} element={<Contacts />} />
      </Routes>
    </>
  );
}

export default App;
