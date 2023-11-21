import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const Pacientes = () => {
  const { sesion } = useAuthContext();
  const [pacientes, setPacientes] = useState([]);
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [codigoPaciente, setCodigoPaciente] = useState("");
  const [ingresePaciente, setIngresePaciente] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/pacientes`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      })
      .then((response) => setPacientes(response.data));
  }, [sesion]);

  const agregarPaciente = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/pacientes",
        {
          nombre: nombrePaciente,
          codigo: codigoPaciente,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setPacientes([...pacientes, response.data]);
      setNombrePaciente("");
      setCodigoPaciente("");
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  const eliminarPaciente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pacientes/${id}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      const updatedPacientes = pacientes.filter((paciente) => paciente.id_paciente !== id);
      setPacientes(updatedPacientes);
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  const buscarPaciente = async (paciente) => {
    try {
      const response = await axios.get(`http://localhost:3000/pacientes/${paciente.id}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      // Si ingresePaciente está vacío, cargar todos los pacientes nuevamente
      if (!ingresePaciente.trim()) {
        const allPacientes = await axios.get("http://localhost:3000/pacientes", {
          headers: { Authorization: `Bearer ${sesion.token}` },
        });
        setPacientes(allPacientes.data);
      } else {
        setPacientes([response.data]);
      }
    } catch (error) {
      console.error("Error al buscar paciente:", error);
    }
  };

  return (
    <>
      <h2>Pacientes</h2>
      <div className="container">
        <label htmlFor="nombrePaciente">Nombre del Paciente:</label>
        <input
          type="text"
          id="nombrePaciente"
          value={nombrePaciente}
          onChange={(e) => setNombrePaciente(e.target.value)}
        />

        <button type="button" class="btn btn-primary" onClick={agregarPaciente}>Agregar</button>

        <br />
        <br />

        <label htmlFor="ingresePaciente">Ingrese Paciente:</label>
        <input
          type="text"
          id="ingresePaciente"
          value={ingresePaciente}
          onChange={(e) => setIngresePaciente(e.target.value)}
        />
        <button type="button" class="btn btn-primary" onClick={() => buscarPaciente({ id: ingresePaciente })}>Buscar</button>

        <br />

        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id_paciente} onDoubleClick={() => buscarPaciente(paciente)}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td> 
                      <button 
                        className="btn btn-danger" 
                        onClick={() => eliminarPaciente(paciente.id_paciente)} 
                      > 
                        Eliminar 
                      </button> 
                    </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
