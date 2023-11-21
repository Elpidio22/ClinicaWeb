import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

export const especialidadRouter = express.Router()

especialidadRouter.post(
  "/",
  body("nombre")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 60 })
    .withMessage("Este campo es obligatorio. Debe tener entre 5 y 10 caracteres"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { nombre } = req.body;
    await db.execute(
      "INSERT INTO especialidad (nombre) values (:nombre)",
      {
        nombre: nombre,
      }
    );
    res.status(201).send({ mensaje: "Especialidad agregada" });
  }
);

//Consultar todas las Especialidades
especialidadRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM especialidad");
  res.status(200).send({
    totalRows: rows.length,
    data: rows,
  });
});
  
  //Consultar Especialidad por id
  especialidadRouter.get("/:id", async (req, res) => {
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
  
 

