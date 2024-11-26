const express = require('express');
const router = express.Router();
const Actividad = require('../models/actividadModel');

// Obtener todas las actividades
router.get('/', async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});

// Crear una nueva actividad
router.post('/', async (req, res) => {
  try {
    const nuevaActividad = new Actividad(req.body);
    const actividadGuardada = await nuevaActividad.save();
    res.status(201).json(actividadGuardada);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear actividad' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actividadActualizada = await Actividad.findByIdAndUpdate(
      req.params.id, // ID tomado de la URL
      req.body,      // Datos enviados en el cuerpo de la solicitud
      { new: true }  // Retorna el documento actualizado
    );
    res.json(actividadActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar actividad' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Actividad.findByIdAndDelete(req.params.id); // Elimina la actividad por su ID
    res.json({ message: 'Actividad eliminada' }); // Respuesta exitosa
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar actividad' }); // Manejo de errores
  }
});


module.exports = router;
