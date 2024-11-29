// controllers/examenController.js
import { moduloExamen } from '../models/.js';
import { moduloPregunta } from '../models/Pregunta.js';
import { moduloExamen } from '../models/Examen.js';

export const listarExamenes = async (req, res) => {
    try {
        const examenes = await moduloExamen.find().populate('preguntas');
        res.render('gestionar_examen', { examenes });
    } catch (error) {
        console.error('Error al listar los exámenes:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo examen
export const crearExamen = async (req, res) => {
    const { titulo, descripcion } = req.body;
    try {
        const nuevoExamen = new moduloExamen({ titulo, descripcion });
        await nuevoExamen.save();
        res.redirect('/examenes');
    } catch (error) {
        console.error('Error al crear el examen:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Eliminar un examen
export const eliminarExamen = async (req, res) => {
    const { id } = req.params;
    try {
        await moduloExamen.findByIdAndDelete(id);
        res.redirect('/examenes');
    } catch (error) {
        console.error('Error al eliminar el examen:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Añadir una pregunta al examen
export const añadirPregunta = async (req, res) => {
    const { examenId, preguntaId } = req.body;
    try {
        const examen = await moduloExamen.findById(examenId);
        if (!examen) {
            return res.status(404).send('Examen no encontrado');
        }
        examen.preguntas.push(preguntaId);
        await examen.save();
        res.redirect(`/examenes/${examenId}`);
    } catch (error) {
        console.error('Error al añadir la pregunta al examen:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Crear una nueva pregunta
export const crearPregunta = async (req, res) => {
    const { texto, tipo, opciones, respuestaCorrecta } = req.body;
    try {
        const nuevaPregunta = new moduloPregunta({
            texto,
            tipo,
            opciones: tipo === 'multiple' ? JSON.parse(opciones) : [],
            respuestaCorrecta: tipo === 'abierta' ? respuestaCorrecta : null,
        });
        await nuevaPregunta.save();
        res.redirect('/preguntas');
    } catch (error) {
        console.error('Error al crear la pregunta:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Listar preguntas para asociarlas a un examen
export const listarPreguntas = async (req, res) => {
    try {
        const preguntas = await moduloPregunta.find();
        res.render('gestionar_preguntas', { preguntas });
    } catch (error) {
        console.error('Error al listar las preguntas:', error);
        res.status(500).send('Error en el servidor');
    }
};