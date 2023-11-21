import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { Layout } from "./Pages/Layout";
import { LoginPage } from "./Pages/LoginPage";
import { Pacientes } from "./Pages/Pacientes";
import { Medicos } from "./pages/Medicos";
import { Especialidad } from "./pages/Especialidad";
import { Turnos } from "./pages/Turnos";
import {RequiredAuth} from "./context/RequireAuth";

function App() {
  return (
    <>
      <h1>Clinica Web</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route
            path="/pacientes"
            element={
              <RequiredAuth>
                <Pacientes/>
              </RequiredAuth>
            }
          />
          <Route
            path="/medicos"
            element={
              <RequiredAuth>
                <Medicos />
              </RequiredAuth>
            }
          />
          <Route
            path="/especialidad"
            element={
              <RequiredAuth>
                <Especialidad />
              </RequiredAuth>
            }
          />
          <Route
            path="/turnos"
            element={
              <RequiredAuth>
                <Turnos />
              </RequiredAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;