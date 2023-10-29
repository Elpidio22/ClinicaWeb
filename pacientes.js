import express from "express";
import { db } from "./db.js";

export const pacientesRouter = express.Router()

pacientesRouter

.post("/", async (req, res) => {
  const nuevoPaciente = req.body.paciente;
  const [rows] = await db.execute(
    "insert into pacientes (nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion, genero, seguro_medico) values (:nombre, :apellido, :dni, :fecha_nacimiento, :telefono, :email, :direccion, :genero, :seguro_medico)",
    {
      nombre: nuevoPaciente.nombre,
      apellido: nuevoPaciente.apellido,
      dni: nuevoPaciente.dni,
      fecha_nacimiento: nuevoPaciente.fecha_nacimiento,
      telefono: nuevoPaciente.telefono,
      email: nuevoPaciente.email,
      direccion: nuevoPaciente.direccion,
      genero: nuevoPaciente.genero,
      seguro_medico: nuevoPaciente.seguro_medico,
    }
  );
  res.status(201).send({ mensaje: "Paciente agregado" });
})

//Consultar Paciente por id
.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT * FROM PACIENTES WHERE ID_PACIENTES=:id",
    { id }
  );
  if (rows.length > 0) {
    res.status(200).send(rows[0]);
  } else {
    res.status(404).send("Paciente no encontrado");
  }
})

//Consultar todos los Pacientes
.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM PACIENTES");
  if (rows.length > 0) {
    res.status(200).send(rows);
  } else {
    res.status(404).send("Pacientes no encontrado");
  }
})

//Modificar Pacientes por id
.put("/:id", async (req, res) => {
  const id = req.params.id;
  const nuevosDatosPaciente = req.body.pacienteEdit;
  await db.execute(
    "update pacientes set nombre=:nombre, apellido=:apellido, dni=:dni, fecha_nacimiento=:fecha_nacimiento, telefono=:telefono, email=:email, direccion=:direccion, genero=:genero, seguro_medico=:seguro_medico WHERE id_pacientes=:id",
    {
      id: id,
      nombre: nuevosDatosPaciente.nombre,
      apellido: nuevosDatosPaciente.apellido,
      dni: nuevosDatosPaciente.dni,
      fecha_nacimiento: nuevosDatosPaciente.fecha_nacimiento,
      telefono: nuevosDatosPaciente.telefono,
      email: nuevosDatosPaciente.email,
      direccion: nuevosDatosPaciente.direccion,
      genero: nuevosDatosPaciente.genero,
      seguro_medico: nuevosDatosPaciente.seguro_medico,
    }
  );
  res.status(200).send("Paciente modificado");
})
.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await db.execute("delete from pacientes where id_pacientes=:id", { id });
  res.status(200).send({ mensaje: "Paciente eliminado" });
});