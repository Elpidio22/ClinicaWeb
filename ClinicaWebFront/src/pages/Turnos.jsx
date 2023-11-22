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
      
      document.getElementById("modal-alta-turno").modal("hide");


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
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-alta-turno">
  Crear un turno
</button>
<br />

<div class="modal fade modal-fullscreen" id="modal-alta-turno" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Dar de alta un turno</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/turnos/alta" method="post">

       
          <input type="hidden" id="paciente" name="paciente" value="123" />

          <div class="form-group">
            <label for="fecha">Fecha</label>
           
            <input type="date" class="form-control" id="fecha" name="fecha" value="2023-12-01" />
          </div>
          <div class="form-group">
            <label for="hora">Hora</label>
           
            <input type="time" class="form-control" id="hora" name="hora" value="12:00" />
          </div>
          <div class="form-group">
            <label for="medicos">Médicos</label>
           
            <select class="form-control" id="medicos" name="medicos">
              <option value="1">Dr. Médico 1</option>
              <option value="2">Dra. Médico 2</option>
            </select>
          </div>
          <div class="form-group">
            <label for="especialidad">Especialidad</label>
            
            <select class="form-control" id="especialidad" name="especialidad">
              <option value="1">Cardiología</option>
              <option value="2">Dermatología</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cupos">Cupos</label>
            <input type="number" class="form-control" id="cupos" name="cupos" value="10" />
          </div>
          <div class="form-group">
            <label for="hora_inicio">Hora de inicio</label>
            <input type="time" class="form-control" id="hora_inicio" name="hora_inicio" value="12:00" />
          </div>
          <div class="form-group">
            <label for="hora_fin">Hora fin</label>
            <input type="time" class="form-control" id="hora_fin" name="hora_fin" value="13:00" />
          </div>
          <div class="form-group">
            <label for="sala">Sala</label>
            <input type="text" class="form-control" id="sala" name="sala" value="Sala 101" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary" onClick={agregarTurno}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


        
      </div>
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
        
    </>
  );
};
