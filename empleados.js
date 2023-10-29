import express from "express";
import { db } from "./db.js";

export const empleadosRouter = express.Router()

empleadosRouter

.post("/", async (req, res) => {
    const nuevoEmpleado = req.body.empleado;
    const [rows] = await db.execute(
      "insert into empleados (nombre, apellido) values (:nombre, :apellido)",
      {
        nombre: nuevoEmpleado.nombre,
        apellido: nuevoEmpleado.apellido,
      }
    );
    res.status(201).send({ mensaje: "Empleado agregado" });
  })
  
  //Consultar Empleado por id
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM EMPLEADOS WHERE ID_EMPLEADOS=:id",
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
      "update empleados set nombre=:nombre, apellido=:apellido WHERE id_empleados=:id",
      {
        id: id,
        nombre: nuevosDatosEmpleado.nombre,
        apellido: nuevosDatosEmpleado.apellido,
      }
    );
    res.status(200).send("Empleado modificado");
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    await db.execute("delete from empleados where id_empleados=:id", { id });
    res.status(200).send({ mensaje: "Empleado eliminado" });
  });