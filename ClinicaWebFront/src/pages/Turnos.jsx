import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";


export const Turnos = () => {
  const { sesion } = useAuthContext();
  const [turnos, setTurnos] = useState([]);
  const [fechaTurno, setFechaTurno] = useState("");
  const [horaTurno, setHoraTurno] = useState("");
  const [id_medicos, setIdMedico] = useState("");
  const [id_paciente, setIdPaciente] = useState("");
  const [id_especialidad, setIdEspecialidad] = useState("");
  const [cuposTurno, setCuposTurno] = useState("");
  const [hora_inicio, setHoraInicio] = useState("");
  const [hora_fin, setHoraFin] = useState("");
  const [salaTurno, setSalaTurno] = useState("");
  const [ingreseTurno, setIngreseTurno] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/turnos`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      })
      .then((response) => setTurnos(response.data));
  }, [sesion]);

  const agregarTurno = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/turnos",
        {
          fecha: fechaTurno,
          hora: horaTurno,
          id_medicos: id_medicos,
          id_paciente: id_paciente,
          id_especialidad: id_especialidad,
          cupos: cupos,
          hora_inicio: hora_inicio,
          hora_fin: hora_fin,
          sala: salaTurno,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setTurnos([...turnos, response.data]);
      setFechaTurno("");
      setHoraTurno("");
      setId_medico("");
      setId_paciente("");
      setId_especialidad("");
      setCuposTurno("");
      setHoraInicio("");
      setHoraFin("");
      setSalaTurno("");
    } catch (error) {
      console.error("Error al agregar turno:", error);
    }
  };

  const buscarTurno = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/turnos/${ingreseTurno}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      // Si ingreseTurno está vacío, cargar todos los turnos nuevamente
      if (!ingreseTurno.trim()) {
        const allTurnos = await axios.get("http://localhost:3000/turnos", {
          headers: { Authorization: `Bearer ${sesion.token}` },
        });
        setTurnos(allTurnos.data);
      } else {
        setTurnos([response.data]);
      }
    } catch (error) {
      console.error("Error al buscar turno:", error);
    }
  };

  return (
    <>
      <h2>Turnos</h2>
      <div className="container">
        <label htmlFor="fechaTurno">Fecha del Turno:</label>
        <input
          type="text"
          id="fechaTurno"
          value={fechaTurno}
          onChange={(e) => setFechaTurno(e.target.value)}
        />
        <br />
        <label htmlFor="horaTurno">Hora del Turno:</label>
        <input
          type="text"
          id="horaTurno"
          value={horaTurno}
          onChange={(e) => setHoraTurno(e.target.value)}
        />
        <br />
        <label htmlFor="idMedico">ID del Médico:</label>
        <input
          type="text"
          id="id_medicos"
          value={id_medicos}
          onChange={(e) => setIdMedico(e.target.value)}
        />
        <br />
        <label htmlFor="idPaciente">ID del Paciente:</label>
        <input
          type="text"
          id="id_paciente"
          value={id_paciente}
          onChange={(e) => setIdPaciente(e.target.value)}
        />
        <br />
        <label htmlFor="idEspecialidad">ID de la Especialidad:</label>
        <input
          type="text"
          id="id_especialidad"
          value={id_especialidad}
          onChange={(e) => setIdEspecialidad(e.target.value)}
        />
        <br />
        <label htmlFor="cuposTurno">Cupos del Turno:</label>
        <input
          type="text"
          id="cuposTurno"
          value={cuposTurno}
          onChange={(e) => setCuposTurno(e.target.value)}
        />
        <br />
        <label htmlFor="horaInicio">Hora de Inicio:</label>
        <input
          type="text"
          id="hora_inicio"
          value={hora_inicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
        <br />
        <label htmlFor="horaFin">Hora de Fin:</label>
        <input
          type="text"
          id="hora_fin"
          value={hora_fin}
          onChange={(e) => setHoraFin(e.target.value)}
        />
        
        <label htmlFor="salaTurno">Sala del Turno:</label>
        <input
          type="text"
          id="salaTurno"
          value={salaTurno}
          onChange={(e) => setSalaTurno(e.target.value)}
        />

        <button onClick={agregarTurno}>Agregar</button>

        <br />
        <br />

        <label htmlFor="ingreseTurno">Ingrese Turno:</label>
        <input
          type="text"
          id="ingreseTurno"
          value={ingreseTurno}
          onChange={(e) => setIngreseTurno(e.target.value)}
        />
        <button onClick={buscarTurno}>Buscar</button>

        <br />

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
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr key={turno.id} onDoubleClick={() => buscarTurno(turno)}>
                <td>{turno.id}</td>
                <td>{turno.fecha}</td>
                <td>{turno.hora}</td>
                <td>{turno.id_medicos}</td>
                <td>{turno.id_paciente}</td>
                <td>{turno.id_especialidad}</td>
                <td>{turno.cupos}</td>
                <td>{turno.hora_inicio}</td>
                <td>{turno.hora_fin}</td>
                <td>{turno.sala}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
