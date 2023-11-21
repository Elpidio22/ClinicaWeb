import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

export const medicosRouter = express.Router()

medicosRouter.post(
  "/",
  body("med_nombre")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 60 })
    .withMessage("Este campo es obligatorio. Debe tener entre 1 y 60 caracteres"),
  body("med_apellidos")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 45 })
    .withMessage("Este campo es obligatorio. Debe tener entre 1 y 45 caracteres"),
  body("id_especialidad")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 30 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { med_nombre, med_apellidos, id_especialidad } = req.body;
    await db.execute(
      "INSERT INTO medicos (med_nombre, med_apellidos, id_especialidad) values (:med_nombre, :med_apellidos, :id_especialidad)",
      {
        med_nombre: med_nombre,
        med_apellidos: med_apellidos,
        id_especialidad: id_especialidad,
      }
    );
    res.status(201).send({ mensaje: "Medico agregado" });
  }
);
  
  //Consultar Medico por id
  medicosRouter.get("/:id", async (req, res) => {
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
  });
  
  //Consultar todos los Medicos
  medicosRouter.get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM MEDICOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Medicos no encontrado");
    }
  });