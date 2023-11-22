import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";


export const LoginPage = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get("usuario");
    const password = formData.get("password");

    login(
      usuario,
      password,
      () => navigate(from, { replace: true }),
      () => setError(true)
    );

    event.preventDefault();
  };

  return (
    <form class="container" onSubmit={onSubmit}>
      <div class="mb-3">
        <label for="usuario" class="form-label">Usuario:</label>
        <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Ingrese su usuario" required />
      </div>
    <div class="mb-3">
      <label for="password" class="form-label">Contraseña:</label>
      <input type="password" class="form-control" id="password" name="password" placeholder="Ingrese su contraseña" required />
    </div>
    <button type="submit" class="btn btn-primary">Ingresar</button>
  {error && <p class="alert alert-danger">Usuario o contraseña inválido</p>}
    </form>
  );
};
