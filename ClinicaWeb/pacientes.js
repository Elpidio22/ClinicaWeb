import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const pacientesRouter = express.Router()

pacientesRouter.post(
  "/",
  body("nombre")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 60 })
    .withMessage("El nombre debe tener entre 6 y 15 caracteres"),
  body("apellido")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 45 })
    .withMessage("El apellido debe tener entre 2 y 30 caracteres"),
  body("dni")
    .isNumeric()
    .isLength({ min: 1, max: 8 })
    .withMessage("El DNI tiene que ser de 8 dígitos"),
  body("telefono")
    .isLength({ min: 10, max: 12 })
    .withMessage("Teléfono no válido. El telefono dee tener entre 10 y 12 caracteres"),
  body("email")
    .isEmail()
    .withMessage("Debe ingresar un email valido"),
    body("direccion")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("La dirección debe tener entre 1 y 100 caracteres")
    .matches(/^[\p{L}\p{N}\s,]+$/u)
    .withMessage("La dirección puede contener letras, números, espacios y comas"),
  body("genero")
  .isLength({ min: 1, max:20 }),
  body("seguro_medico")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 30 }),
    
    async (req, res) => {
      try {
        const { nombre, apellido, dni, telefono, email, direccion, genero, seguro_medico } = req.body;
        await db.execute(
          "INSERT INTO pacientes (nombre, apellido, dni, telefono, email, direccion, genero, seguro_medico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [nombre, apellido, dni, telefono, email, direccion, genero, seguro_medico]
        );
  
        res.status(201).send({ mensaje: "Paciente agregado" });
      } catch (error) {
        console.error("Error al agregar paciente:", error);
        res.status(500).send({ error: "Error interno del servidor" });
      }
    }

);

//Consultar Paciente por id
pacientesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT * FROM PACIENTES WHERE NOMBRE=:id",
    { id }
  );
  if (rows.length > 0) {
    res.status(200).send(rows[0]);
  } else {
    res.status(404).send("Paciente no encontrado");
  }
});

//Consultar todos los Pacientes (listo)
pacientesRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM pacientes");
  if (rows.length > 0) {
    res.status(200).send(rows);
  } else {
    res.status(404).send("Pacientes no encontrado");
  }
});

//Modificar Pacientes por id
pacientesRouter.put(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const { nombre, apellido, dni, telefono, email, direccion, genero, seguro_medico } = req.body;
    await db.execute(
      "UPDATE pacientes set nombre=:nombre, apellido=:apellido, dni=:dni, telefono=:telefono, email=:email, direccion=:direccion, genero=:genero, seguro_medico=:seguro_medico WHERE id_paciente=:id",
      {
        id: id,
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        telefono: telefono,
        email: email,
        direccion: direccion,
        genero: genero,
        seguro_medico: seguro_medico,
      }
    );
    res.status(200).send({ mensaje: "Paciente modificado" });
  }
);

pacientesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await db.execute("delete from pacientes where id_paciente=:id", { id });
  res.status(200).send({ mensaje: "Paciente eliminado" });
});