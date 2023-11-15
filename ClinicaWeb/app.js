import express from "express";
import cors from "cors";
import { pacientesRouter } from "./pacientes.js";
import { medicosRouter } from "./medicos.js";
import { turnosRouter } from "./turnos.js";
import { empleadosRouter } from "./empleados.js";
import { especialidadRouter } from "./especialidad.js";

const app = express();
app.use(express.json());
app.use(cors());

//Rutas de la base de datos
app.use("/pacientes", pacientesRouter);
app.use("/medicos", medicosRouter);
app.use("/turnos", turnosRouter);
app.use("/empleados", empleadosRouter);
app.use("/especialidad", especialidadRouter);

//app.get("/", (_req,res) => {
//    res.send("Hola mundo");
//});

// Pongo en funcionamiento la API en puerto 3000

app.listen(3000, () => {
    console.log("API en funcionamiento");
});