import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export const AuthStatus = () => {
  const { sesion, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!sesion) {
    return <p>No se conecto ningun administrador</p>;
  }

  return (
    <>
      <p>El administrador {sesion.usuario} conectado</p>
      <button type="submit" className="btn btn-secondary"
        onClick={() => {
          logout(navigate);
        }}
      >
        Cerrar Sesión
      </button>
    </>
  );
};
