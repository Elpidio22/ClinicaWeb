import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";

export const empleadosRouter = express.Router()

empleadosRouter

.post("/",
    body("empleado.nom_empleado").isAlpha().isLength({ min: 1, max: 100 }),
    body("empleado.apellido_empleado").isAlpha().isLength({ min: 1, max: 45 }),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }

      const nuevoEmpleado = req.body.empleado;
      await db.execute(
        "insert into empleados (nom_empleado, apellido_empleado) values (:nom_empleado, :apellido_empleado)",
        {
          nom_empleado: nuevoEmpleado.nom_empleado,
          apellido_empleado: nuevoEmpleado.apellido_empleado,
        }
      );
      res.status(201).send({ mensaje: "Empleado agregado" });
    }
  )

  //Consultar Empleado por id
.get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM EMPLEADOS WHERE ID=:id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Empleado no encontrado");
    }
  })
  
  //Consultar todos los Empleados
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM EMPLEADOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Empleados no encontrado");
    }
  })
  
  //Modificar Empleados por id
  .put("/:id", async (req, res) => {
    const id = req.params.id;
    const nuevosDatosEmpleado = req.body.empleadoEdit;
    await db.execute(
      "update empleados set id=:id, nom_empleado=:nom_empleado, apellido_empleado=:apellido_empleado WHERE id=:id",
      {
        id: id,
        nom_empleado: nuevosDatosEmpleado.nom_empleado,
        apellido_empleado: nuevosDatosEmpleado.apellido_empleado,
      }
    );
    res.status(200).send("Empleado modificado");
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    await db.execute("delete from empleados where id=:id", { id });
    res.status(200).send({ mensaje: "Empleado eliminado" });
  });