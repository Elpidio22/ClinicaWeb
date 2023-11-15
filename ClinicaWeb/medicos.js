import express from "express";
import { db } from "./db.js";

export const medicosRouter = express.Router()

medicosRouter

.post("/", async (req, res) => {
    const nuevoMedico = req.body.medico;
    const [rows] = await db.execute(
      "insert into medicos (nombre, apellido, especialidad) values (:nombre, :apellido, :especialidad)",
      {
        nombre: nuevoMedico.nombre,
        apellido: nuevoMedico.apellido,
        especialidad_id: nuevoMedico.especialidad_id,
      }
    );
    res.status(201).send({ mensaje: "Medico agregado" });
  })
  
  //Consultar Medico por id
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM MEDICOS WHERE ID_MEDICO=:id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Medico no encontrado");
    }
  })
  
  //Consultar todos los Medicos
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM MEDICOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Medicos no encontrado");
    }
  });