import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

export const Empleados = () => {
  const { sesion } = useAuthContext();
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/empleados`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      })
      .then((response) => setEmpleados(response.data));
  }, [sesion]);

  return (
    <>
      <h2>Empleados</h2>
      <div className="container">
        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Id</th>
              <th>Usuario</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleados) => (
              <tr key={empleado.id} onDoubleClick={() => empleados(empleados)}>
                <td>{empleados.id}</td>
                <td>{empleados.usuario}</td>
                <td>{empleados.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};