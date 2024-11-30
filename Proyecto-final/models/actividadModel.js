import {Schema, model} from "mongoose";

const actividadSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  secciones: [
    {
      titulo: { type: String, required: true },
      texto: { type: String, required: true }
    }
  ],
  preguntas: [
    {
      enunciado: { type: String, required: true },
      opciones: [{ type: String, required: true }]
    }
  ],
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividad', actividadSchema);
