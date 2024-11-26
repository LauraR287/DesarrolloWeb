import { Schema, model } from "mongoose";

const schemaUsuario = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true, minlength: 6 }
});


const modeloUsuario = model("usuarios", schemaUsuario);

export {modeloUsuario};