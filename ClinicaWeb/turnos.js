import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const turnosRouter = express.Router();

turnosRouter.post(
  "/",
  body("fecha")
    .isISO8601(),
  body("hora"),
  body("id_medico")
    .isInt({ min: 1 })
    .withMessage("Debe ser un id de medico valido."),
  body("id_paciente")
    .isInt({ min: 1 })
    .withMessage("Debe ser un id de paciente valido."),
  body("id_especialidad")
    .isInt({ min: 1 })
    .withMessage("Debe ser una especialidad valida."),
  body("cupos")
    .isInt({ min:1, max:10 }),
  body("hora_inicio"),
  body("hora_fin"),
  body("sala")
    .isInt({ min: 1, max:20 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { fecha, hora, id_medico, id_paciente, id_especialidad, cupos, hora_inicio, hora_fin, sala } = req.body;
    await db.execute(
      "INSERT INTO turnos (fecha, hora, id_medico, id_paciente, id_especialidad, cupos, hora_inicio, hora_fin, sala) values (:fecha, :hora, :id_medico, :id_paciente, :id_especialidad, :cupos, :hora_inicio, :hora_fin, :sala)",
      {
        fecha: fecha,
        hora: hora,
        id_medico: id_medico,
        id_paciente: id_paciente,
        id_especialidad: id_especialidad,
        cupos: cupos,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        sala: sala,
      }
    );
    res.status(201).send({ mensaje: "Turno agregado" });
  }
);

  //Consultar Turno por id
  turnosRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM TURNOS WHERE ID=:id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Turno no encontrado");
    }
  });

  //Consultar todos los Turnos
  turnosRouter.get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM TURNOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Turnos no encontrado");
    }
  });

  //Modificar Turnos por id
  turnosRouter.put(
    "/:id",
    param("id").isInt().isLength({ min: 1 }),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
      }
      const { id } = req.params;
      const { fecha, hora, id_medico, id_paciente, id_especialidad, cupos, hora_inicio, hora_fin, sala } = req.body;
      await db.execute(
        "UPDATE turnos set fecha=:fecha, hora=:hora, id_medicos=:id_medico, id_paciente=:id_paciente, id_especialidad=:id_especialidad, cupos=:cupos, hora_inicio=:hora_inicio, hora_fin=:hora_fin, sala=:sala WHERE id=:id",
        {
          id: id,
          fecha: fecha,
          hora: hora,
          id_medico: id_medico,
          id_paciente: id_paciente,
          id_especialidad: id_especialidad,
          cupos: cupos,
          hora_inicio: hora_inicio,
          hora_fin: hora_fin,
          sala: sala,
        }
      );
      res.status(200).send({ mensaje: "Turno modificado" });
    }
  );

  turnosRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await db.execute("delete from turnos where id=:id", { id });
    res.status(200).send({ mensaje: "Turno eliminado" });
  });

  //Agregar Sobre turno
  // .post("/", async (req, res) => {
  //   const nuevoTurno = req.body.turno;
  //   const [rows] = await db.execute(
  //     "insert into turnos (fecha, hora, medico, paciente, especialidad, cupos, hora_inicio, hora_fin, sobreturnos, sala) values (:fecha, :hora, :medico, :paciente, :especialidad, :cupos, :hora inicio, :hora_fin, :sobreturnos, :sala)",
  //     {
  //       fecha: nuevoTurno.fecha,
  //       hora: nuevoTurno.hora,
  //       medico: nuevoTurno.medico,
  //       paciente: nuevoTurno.paciente,
  //       especialidad: nuevoTurno.especialidad,
  //       cupos: nuevoTurno.cupos,
  //       hora_inicio: nuevoTurno.hora_inicio,
  //       hora_fin: nuevoTurno.hora_fin,
  //       sobreturnos: nuevoTurno.sobreturnos,
  //       sala: nuevoTurno.sala,
  //     }
  //   );
  //   res.status(201).send({ mensaje: "Sobre turno agendado" });
  // })

  //Consultar Sobre Turno por id
  // .get("/:id", async (req, res) => {
  //   const id = req.params.id;
  //   const [rows, fields] = await db.execute(
  //     "SELECT * FROM TURNOS WHERE ID_TURNOS=:id",
  //     { id }
  //   );
  //   if (rows.length > 0) {
  //     res.status(200).send(rows[0]);
  //   } else {
  //     res.status(404).send("Turno no encontrado");
  //   }
  // })

  //Consultar todos los Sobre Turnos
  // .get("/", async (req, res) => {
  //   const [rows, fields] = await db.execute("SELECT * FROM TURNOS");
  //   if (rows.length > 0) {
  //     res.status(200).send(rows);
  //   } else {
  //     res.status(404).send("Sobre Turnos no encontrado");
  //   }
  // });