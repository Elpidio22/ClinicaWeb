import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const Turnos = () => {
  const { sesion } = useAuthContext();
  const [turnos, setTurnos] = useState([]);
  const [fechaTurno, setFechaTurno] = useState("");
  const [horaTurno, setHoraTurno] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [especialidadId, setEspecialidadId] = useState("");
  const [cuposTurno, setCuposTurno] = useState("");
  const [horaInicioTurno, setHoraInicioTurno] = useState("");
  const [horaFinTurno, setHoraFinTurno] = useState("");
  const [salaTurno, setSalaTurno] = useState("");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  useEffect(() => {
    cargarTurnos();
  }, []);

  const cargarTurnos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/turnos");
      setTurnos(response.data);
    } catch (error) {
      console.error("Error al cargar turnos:", error);
    }
  };

  const agregarTurno = async () => {
    try {
      if (turnoSeleccionado) {
        // Si hay un turno seleccionado, realizar una actualización
        await axios.put(
          `http://localhost:3000/turnos/${turnoSeleccionado.id}`,
          {
            fecha: fechaTurno,
            hora: horaTurno,
            id_medico: medicoId,
            id_paciente: pacienteId,
            id_especialidad: especialidadId,
            cupos: cuposTurno,
            hora_inicio: horaInicioTurno,
            hora_fin: horaFinTurno,
            sala: salaTurno,
          }
        );

        // Actualizar la lista de turnos después de la actualización
        cargarTurnos();
      } else {
        // Si no hay turno seleccionado, agregar uno nuevo
        const response = await axios.post(
          "http://localhost:3000/turnos",
          {
            fecha: fechaTurno,
            hora: horaTurno,
            id_medico: medicoId,
            id_paciente: pacienteId,
            id_especialidad: especialidadId,
            cupos: cuposTurno,
            hora_inicio: horaInicioTurno,
            hora_fin: horaFinTurno,
            sala: salaTurno,
          }
        );

        setTurnos([...turnos, response.data]);
      }

      // Limpiar los campos del formulario después de agregar o actualizar el turno
      setTurnoSeleccionado(null);
      setFechaTurno("");
      setHoraTurno("");
      setMedicoId("");
      setPacienteId("");
      setEspecialidadId("");
      setCuposTurno("");
      setHoraInicioTurno("");
      setHoraFinTurno("");
      setSalaTurno("");
      cargarTurnos();
    } catch (error) {
      console.error("Error al agregar o actualizar turno:", error);
    }
  };

  const editarTurno = (turno) => {
    setTurnoSeleccionado(turno);
    setFechaTurno(turno.fecha);
    setHoraTurno(turno.hora);
    setMedicoId(turno.id_medico);
    setPacienteId(turno.id_paciente);
    setEspecialidadId(turno.id_especialidad);
    setCuposTurno(turno.cupos);
    setHoraInicioTurno(turno.hora_inicio);
    setHoraFinTurno(turno.hora_fin);
    setSalaTurno(turno.sala);
  };

  const eliminarTurno = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/turnos/${id}`);

      const updatedTurnos = turnos.filter(
        (turno) => turno.id !== id
      );
      setTurnos(updatedTurnos);
    } catch (error) {
      console.error("Error al eliminar turno:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h2>Turnos</h2>
          <div className="flex-grow-1">
            {/* Formulario de alta */}
            <form id="alta-turno-form">
              <div className="form-group">
                <label htmlFor="fechaTurno">Fecha</label>
                <input
                  type="text"
                  className="form-control"
                  id="fechaTurno"
                  name="fechaTurno"
                  value={fechaTurno}
                  onChange={(e) => setFechaTurno(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="horaTurno">Hora</label>
                <input
                  type="text"
                  className="form-control"
                  id="horaTurno"
                  name="horaTurno"
                  value={horaTurno}
                  onChange={(e) => setHoraTurno(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="medicoId">ID Médico</label>
                <input
                  type="text"
                  className="form-control"
                  id="medicoId"
                  name="medicoId"
                  value={medicoId}
                  onChange={(e) => setMedicoId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pacienteId">ID Paciente</label>
                <input
                  type="text"
                  className="form-control"
                  id="pacienteId"
                  name="pacienteId"
                  value={pacienteId}
                  onChange={(e) => setPacienteId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="especialidadId">ID Especialidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="especialidadId"
                  name="especialidadId"
                  value={especialidadId}
                  onChange={(e) => setEspecialidadId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cuposTurno">Cupos</label>
                <input
                  type="text"
                  className="form-control"
                  id="cuposTurno"
                  name="cuposTurno"
                  value={cuposTurno}
                  onChange={(e) => setCuposTurno(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="horaInicioTurno">Hora Inicio</label>
                <input
                  type="text"
                  className="form-control"
                  id="horaInicioTurno"
                  name="horaInicioTurno"
                  value={horaInicioTurno}
                  onChange={(e) => setHoraInicioTurno(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="horaFinTurno">Hora Fin</label>
                <input
                  type="text"
                  className="form-control"
                  id="horaFinTurno"
                  name="horaFinTurno"
                  value={horaFinTurno}
                  onChange={(e) => setHoraFinTurno(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="salaTurno">Sala</label>
                <input
                  type="text"
                  className="form-control"
                  id="salaTurno"
                  name="salaTurno"
                  value={salaTurno}
                  onChange={(e) => setSalaTurno(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={agregarTurno}
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
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>ID Médico</th>
                <th>ID Paciente</th>
                <th>ID Especialidad</th>
                <th>Cupos</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Sala</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map((turno) => (
                <tr
                  key={turno.id}
                  onDoubleClick={() => editarTurno(turno)}
                >
                  <td>{turno.id}</td>
                  <td>{turno.fecha}</td>
                  <td>{turno.hora}</td>
                  <td>{turno.id_medico}</td>
                  <td>{turno.id_paciente}</td>
                  <td>{turno.id_especialidad}</td>
                  <td>{turno.cupos}</td>
                  <td>{turno.hora_inicio}</td>
                  <td>{turno.hora_fin}</td>
                  <td>{turno.sala}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarTurno(turno.id)}
                    >
                      Eliminar
                    </button>
                    <br />
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={() => editarTurno(turno)}
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

export default Turnos;
