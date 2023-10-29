import express from "express";
import { db } from "./db.js";

export const turnosRouter = express.Router()

turnosRouter

.post("/", async (req, res) => {
    const nuevoTurno = req.body.turno;
    const [rows] = await db.execute(
      "insert into turnos (fecha, hora, medico, paciente, especialidad, cupos, hora_inicio, hora_fin, sala) values (:fecha, :hora, :medico, :paciente, :especialidad, :cupos, :hora inicio, :hora_fin, :sala)",
      {
        fecha: nuevoTurno.fecha,
        hora: nuevoTurno.hora,
        medico: nuevoTurno.medico,
        paciente: nuevoTurno.paciente,
        especialidad: nuevoTurno.especialidad,
        cupos: nuevoTurno.cupos,
        hora_inicio: nuevoTurno.hora_inicio,
        hora_fin: nuevoTurno.hora_fin,
        sala: nuevoTurno.sala,
      }
    );
    res.status(201).send({ mensaje: "Turno agendado" });
  })
  
  //Consultar Turno por id
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM TURNOS WHERE ID_TURNOS=:id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Turno no encontrado");
    }
  })
  
  //Consultar todos los Turnos
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM TURNOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Turnos no encontrado");
    }
  })
  
  //Modificar Turnos por id
  .put("/:id", async (req, res) => {
    const id = req.params.id;
    const nuevosDatosTurno = req.body.turnoEdit;
    await db.execute(
      "update turnos set fecha=:fecha, hora=:hora, medico=:medico, paciente=:paciente, especialidad=:especialidad, cupos=:cupos, hora_inicio=:hora_inicio, hora_fin=:hora_fin, sala=:sala WHERE id_turno=:id",
      {
        id: id,
        fecha: nuevoTurno.fecha,
        hora: nuevoTurno.hora,
        medico: nuevoTurno.medico,
        paciente: nuevoTurno.paciente,
        especialidad: nuevoTurno.especialidad,
        cupos: nuevoTurno.cupos,
        hora_inicio: nuevoTurno.hora_inicio,
        hora_fin: nuevoTurno.hora_fin,
        sala: nuevoTurno.sala,
      }
    );
    res.status(200).send("Turno modificado");
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    await db.execute("delete from turnos where id_turnos=:id", { id });
    res.status(200).send({ mensaje: "Turno eliminado" });
  })

  //Agregar Sobre turno
  .post("/", async (req, res) => {
    const nuevoTurno = req.body.turno;
    const [rows] = await db.execute(
      "insert into turnos (fecha, hora, medico, paciente, especialidad, cupos, hora_inicio, hora_fin, sobreturnos, sala) values (:fecha, :hora, :medico, :paciente, :especialidad, :cupos, :hora inicio, :hora_fin, :sobreturnos, :sala)",
      {
        fecha: nuevoTurno.fecha,
        hora: nuevoTurno.hora,
        medico: nuevoTurno.medico,
        paciente: nuevoTurno.paciente,
        especialidad: nuevoTurno.especialidad,
        cupos: nuevoTurno.cupos,
        hora_inicio: nuevoTurno.hora_inicio,
        hora_fin: nuevoTurno.hora_fin,
        sobreturnos: nuevoTurno.sobreturnos,
        sala: nuevoTurno.sala,
      }
    );
    res.status(201).send({ mensaje: "Sobre turno agendado" });
  })

  //Consultar Sobre Turno por id
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM TURNOS WHERE ID_TURNOS=:id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Turno no encontrado");
    }
  })
  
  //Consultar todos los Sobre Turnos
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM TURNOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Sobre Turnos no encontrado");
    }
  })