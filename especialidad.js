import express from "express";
import { db } from "./db.js";

export const especialidadRouter = express.Router()

especialidadRouter

//Consultar todas las Especialidades
.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM especialidad");
  res.status(200).send({
    totalRows: rows.length,
    data: rows,
  });
})

.post("/", async (req, res) => {
    const nuevoEspecialidad = req.body.especialidad;
    await db.execute(
      "insert into especialidad (nombre) values (:nombre)",
      {
        nombre:nuevoEspecialidad.nombre,
      }
    );
    res.status(201).send({ mensaje: "Especialidad agregado" });
  })
  
  //Consultar Especialidad por id
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM ESPECIALIDAD WHERE ID_ESPECIALIDAD=:id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Especialidad no encontrada");
    }
  })
  
 

