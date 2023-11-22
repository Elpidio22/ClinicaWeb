import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const Pacientes = () => {
  const { sesion } = useAuthContext();
  const [pacientes, setPacientes] = useState([]);
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [apellidoPaciente, setCodigoPaciente] = useState("");
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
          apellido: apellidoPaciente,
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
      <div className="container d-flex flex-column">
        <div className="flex-grow-1">
          <label htmlFor="ingresePaciente">Ingrese Paciente:</label>
          <input
            type="text"
            id="ingresePaciente"
            value={ingresePaciente}
            onChange={(e) => setIngresePaciente(e.target.value)}
          />
          <button type="button" class="btn btn-primary" onClick={() => buscarPaciente({ id: ingresePaciente })}>Buscar</button>
        </div>

        <table className="table table-hover col-md-3">
          <thead className="table-success">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Genero</th>
              <th>Fecha Nacimiento</th>
              <th>Direccion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id_paciente} onDoubleClick={() => buscarPaciente(paciente)}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.dni}</td>
                <td>{paciente.genero}</td>
                <td>{paciente.fecha_nacimiento}</td>
                <td>{paciente.direccion}</td>
                

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
     
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-alta-paciente">
  Dar de alta un paciente
</button>


<div class="modal fade modal-fullscreen" id="modal-alta-paciente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Dar de alta un paciente</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/pacientes/alta" method="post">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre" />
          </div>
          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input type="text" class="form-control" id="apellido" name="apellido" />
          </div>
          <div class="form-group">
            <label for="dni">DNI</label>
            <input type="text" class="form-control" id="dni" name="dni" />
          </div>
          <div class="form-group">
            <label for="fecha_nacimiento">Fecha de nacimiento</label>
            <input type="date" class="form-control" id="fecha_nacimiento" name="fecha_nacimiento" />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input type="text" class="form-control" id="telefono" name="telefono" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" />
          </div>
          <div class="form-group">
            <label for="direccion">Dirección</label>
            <input type="text" class="form-control" id="direccion" name="direccion" />
          </div>
          <div class="form-group">
            <label for="genero">Género</label>
            <select class="form-control" id="genero" name="genero">
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div class="form-group">
            <label for="seguro_medico">Seguro médico</label>
            <select class="form-control" id="seguro_medico" name="seguro_medico">
              <option value="1">OSDE</option>
              <option value="2">Amsa</option>
              <option value="3">Osecac</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </>


  );
};
