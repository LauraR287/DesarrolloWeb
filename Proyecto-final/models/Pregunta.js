import { Schema, model } from "mongoose";
import mongoose from 'mongoose';

const preguntaSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    tipo: { type: String, enum: ['abierta', 'multiple'], required: true },
    opciones: [{ texto: String, correcta: Boolean }], // Solo para preguntas tipo "multiple"
    respuestaCorrecta: { type: String }, // Solo para preguntas abiertas
});

const moduloPregunta = mongoose.model('Pregunta', preguntaSchema);

export {moduloPregunta};