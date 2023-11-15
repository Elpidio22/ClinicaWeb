import mysql from "mysql2/promise";
//import "dotenv/config";

//Conectar a base de datos

export const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zona1993",
    database: "clinica",
    namedPlaceholders: true,
});

console.log("Conectado a base de datos");
