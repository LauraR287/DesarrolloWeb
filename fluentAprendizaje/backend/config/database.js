import { connect } from "mongoose";

async function conectarBaseDeDatos() {
    try {
        const respuestaBaseDatos = await connect("mongodb://localhost:27017/fluent");
        console.log("Conectado a la base de datos");
        return respuestaBaseDatos;
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}

export { conectarBaseDeDatos };
