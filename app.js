import express from "express";
import cors from "cors";
import { pacientesRouter } from "./pacientes.db";
import { medicosRouter } from "./medicos.db";
import { turnoRouter } from "./turnos.db";
import { empleadosRouter } from "./empleados.db";
import { especialedadRouter } from "./especialidad";

const app = express();
app.use(express.json());
app.use(cors());

//Rutas de la base de datos
app.use("./pacientes", pacientesRouter);
app.use("/medicos", medicosRouter);
app.use("/turnos", turnoRouter);
app.use("/empleados", empleadosRouter);
app.use("/especialidad", especialedadRouter)

app.get("/", (req,res) => {
    res.send("Hola mundo");
});

// Pongo en funcionamiento la API en puerto 3000

app.listen(3000, () => {
    console.log("API en funcionamiento");
});