import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "../context/AuthStatus";
import { useAuthContext } from "../context/AuthContext";

export const Layout = () => {
  const { sesion } = useAuthContext();

  return (
    <>
      <AuthStatus />
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Sistema de Gestión de Turnos</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/" class="nav-link">Home</Link>
        </li>
        {
          !sesion && (
            <>
              <li class="nav-item">
                <Link to="/login" class="nav-link">Login</Link>
              </li>
            </>
          )
        }
        {
          sesion && (
            <>
              <li class="nav-item">
                <Link to="/pacientes" class="nav-link">Pacientes</Link>
              </li>
              <li class="nav-item">
                <Link to="/medicos" class="nav-link">Médicos</Link>
              </li>
              <li class="nav-item">
                <Link to="/especialidad" class="nav-link">Especialidades</Link>
              </li>
              <li class="nav-item">
                <Link to="/turnos" class="nav-link">Turnos</Link>
              </li>
            </>
          )
        }
      </ul>
    </div>
  </div>
</nav>

      <Outlet />
    </>
  );
};