import express from 'express';
import { conectarBaseDeDatos } from './config/database.js';
import { moduloExamen } from './models/Examen.js';
import { moduloPregunta } from './models/Pregunta.js';
import { join } from 'path';
import { __dirname } from './util/__dirname.js';

const server = express();

// Conexión a la base de datos
conectarBaseDeDatos().then(() => {
    console.log('Conexión a la base de datos exitosa');
});

// Configuración motor de plantillas EJS
server.set('view engine', 'ejs');
server.set('views', join(__dirname, 'views'));

// Configuración Archivos estáticos (CSS y JS)
server.use(express.urlencoded({extended: true}));
server.use(express.static('assets'));
server.use(express.json());

// Rutas

// Página principal del menú de exámenes
server.get('/menu-examenes', (req, res) => {
    res.render('menu_examenes');
});

server.get('/gestionar-examenes', (req, res) => {
    res.render('gestionar_examenes');
});

server.get('/examenes', async (req, res) => {
    const examenes = await moduloExamen.find().populate('preguntas');
    res.render('gestionar_examenes', { examenes });
});

server.post('/examenes/modificar', async (req, res) => {
    const { examenId, texto, tipoPregunta, opciones, respuestaCorrecta } = req.body;

    // Crear la pregunta
    const nuevaPregunta = new moduloPregunta({
        texto,
        tipo: tipoPregunta,
        opciones: tipoPregunta === 'multiple' ? opciones.split(',').map(o => ({ texto: o, correcta: o === respuestaCorrecta })) : [],
        respuestaCorrecta: tipoPregunta === 'abierta' ? respuestaCorrecta : null,
    });
    await nuevaPregunta.save();

    // Asociar la pregunta al examen
    await moduloExamen.findByIdAndUpdate(examenId, { $push: { preguntas: nuevaPregunta._id } });
    res.redirect('/examenes');
});

server.get('/examenes', async (req, res) => {
    try {
        const examenes = await moduloExamen.find(); // Obtiene los exámenes de la base de datos
        res.render('gestionar_examenes', { examenes }); // Pasa la variable `examenes` a la vista
    } catch (error) {
        console.error('Error al obtener exámenes:', error);
        res.status(500).send('Error al cargar los exámenes');
    }
});



// Iniciar servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
