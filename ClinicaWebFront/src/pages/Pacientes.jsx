import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const Pacientes = () => {
  const { sesion } = useAuthContext();
  const [pacientes, setPacientes] = useState([]);
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [apellidoPaciente, setApellidoPaciente] = useState("");
  const [dniPaciente, setDniPaciente] = useState("");
  const [telefonoPaciente, setTelefonoPaciente] = useState("");
  const [emailPaciente, setEmailPaciente] = useState("");
  const [direccionPaciente, setDireccionPaciente] = useState("");
  const [generoPaciente, setGeneroPaciente] = useState("");
  const [seguroPaciente, setSeguroPaciente] = useState("");
  const [ingresePaciente, setIngresePaciente] = useState("");

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pacientes");
      setPacientes(response.data);
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
    }
  };

  const agregarPaciente = async () => {
    try {
      if (pacienteSeleccionado) {
        // Si hay un paciente seleccionado, realizar una actualización
        await axios.put(
          `http://localhost:3000/pacientes/${pacienteSeleccionado.id_paciente}`,
          {
            nombre: nombrePaciente,
            apellido: apellidoPaciente,
            dni: dniPaciente,
            telefono: telefonoPaciente,
            email: emailPaciente,
            direccion: direccionPaciente,
            genero: generoPaciente,
            seguro_medico: seguroPaciente,
          }
        );
  
        // Actualizar la lista de pacientes después de la actualización
        cargarPacientes();
      } else {
        // Si no hay paciente seleccionado, agregar uno nuevo
        const response = await axios.post(
          "http://localhost:3000/pacientes",
          {
            nombre: nombrePaciente,
            apellido: apellidoPaciente,
            dni: dniPaciente,
            telefono: telefonoPaciente,
            email: emailPaciente,
            direccion: direccionPaciente,
            genero: generoPaciente,
            seguro_medico: seguroPaciente,
          }
        );
  
        setPacientes([...pacientes, response.data]);
      }
  
      // Limpiar los campos del formulario después de agregar o actualizar el paciente
      setPacienteSeleccionado(null);
      setNombrePaciente("");
      setApellidoPaciente("");
      setDniPaciente("");
      setTelefonoPaciente("");
      setEmailPaciente("");
      setDireccionPaciente("");
      setGeneroPaciente("");
      setSeguroPaciente("");
      cargarPacientes();
    } catch (error) {
      console.error("Error al agregar o actualizar paciente:", error);
    }
  };
  
  const editarPaciente = (paciente) => {
    setPacienteSeleccionado(paciente);
    setNombrePaciente(paciente.nombre);
    setApellidoPaciente(paciente.apellido);
    setDniPaciente(paciente.dni);
    setTelefonoPaciente(paciente.telefono);
    setEmailPaciente(paciente.email);
    setDireccionPaciente(paciente.direccion);
    setGeneroPaciente(paciente.genero);
    setSeguroPaciente(paciente.seguro_medico);
  };

  const eliminarPaciente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pacientes/${id}`);

      const updatedPacientes = pacientes.filter(
        (paciente) => paciente.id_paciente !== id
      );
      setPacientes(updatedPacientes);
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  const buscarPaciente = async (paciente) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pacientes/${paciente.id}`,
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      // Si ingresePaciente está vacío, cargar todos los pacientes nuevamente
      if (!ingresePaciente.trim()) {
        const allPacientes = await axios.get(
          "http://localhost:3000/pacientes",
          {
            headers: { Authorization: `Bearer ${sesion.token}` },
          }
        );
        setPacientes(allPacientes.data);
      } else {
        setPacientes([response.data]);
      }
    } catch (error) {
      console.error("Error al buscar paciente:", error);
    }
  };

  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Pacientes</h2>
          <div className="flex-grow-1">
            <label htmlFor="ingresePaciente">Ingrese Paciente:</label>
            <input
              type="text"
              id="ingresePaciente"
              value={ingresePaciente}
              onChange={(e) => setIngresePaciente(e.target.value)}
            />
            <button type="button" className="btn btn-primary" onClick={() => buscarPaciente({ id: ingresePaciente })}>
              Buscar</button>

            {/* Formulario de alta */}
            <form id="alta-paciente-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={nombrePaciente}
                  onChange={(e) => setNombrePaciente(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={apellidoPaciente}
                  onChange={(e) => setApellidoPaciente(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  name="dni"
                  value={dniPaciente}
                  onChange={(e) => setDniPaciente(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={telefonoPaciente}
                  onChange={(e) => setTelefonoPaciente(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={emailPaciente}
                  onChange={(e) => setEmailPaciente(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={direccionPaciente}
                  onChange={(e) => setDireccionPaciente(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genero">Género</label>
                <select
                  className="form-control"
                  id="genero"
                  name="genero"
                  value={generoPaciente}
                  onChange={(e) => setGeneroPaciente(e.target.value)}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="seguro_medico">Seguro médico</label>
                <select
                  className="form-control"
                  id="seguro_medico"
                  name="seguro_medico"
                  value={seguroPaciente}
                  onChange={(e) => setSeguroPaciente(e.target.value)}
                >
                  <option value="1">OSDE</option>
                  <option value="2">Amsa</option>
                  <option value="3">Osecac</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={agregarPaciente}
              >
                Guardar
              </button>
            </form>
          </div>
        </div>

        {/* Sección de la tabla */}
        <div className="col-md-6">
          <table className="table table-hover">
            <thead className="table-success">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Genero</th>
                <th>Direccion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr
                  key={paciente.id_paciente}
                  onDoubleClick={() => buscarPaciente(paciente)}
                >
                  <td>{paciente.id_paciente}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.apellido}</td>
                  <td>{paciente.dni}</td>
                  <td>{paciente.genero}</td>
                  <td>{paciente.direccion}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarPaciente(paciente.id_paciente)}
                    >
                      Eliminar
                    </button>
                    <br />
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={() => editarPaciente(paciente)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pacientes;
