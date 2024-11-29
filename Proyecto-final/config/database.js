import { connect } from "mongoose";

async function conectarBaseDeDatos(){
    try{
        const respuestaBaseDatos = connect("mongodb://localhost:27017/fluent");
        console.log("Conectado a la base de datos");
        return respuestaBaseDatos;

    } catch(error){
        console.log(error)
    }
}

export {conectarBaseDeDatos}