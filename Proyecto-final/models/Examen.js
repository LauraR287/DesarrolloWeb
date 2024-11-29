import { Schema, model } from "mongoose";
import mongoose from 'mongoose';

const examenSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    preguntas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta' }],
});

const moduloExamen = mongoose.model('Examen', examenSchema);

export {moduloExamen};




