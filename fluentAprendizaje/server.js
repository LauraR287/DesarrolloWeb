import express, {json} from 'express';
import { join } from 'path';
import {_dirname} from "./util/_dirname.js"
import {
    getActividades,
    createActividad
} from './controller/controladorActividades.js';

import { conectarBaseDeDatos } from './backend/config/database.js';
import path from 'path'; 

const server = express();
conectarBaseDeDatos()

server.set("view engine", "ejs")
server.set('views', path.join(_dirname, 'views'));

server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.use(json())

server.get('/api/actividades', getActividades);
server.post('/api/actividades/crearActividad', createActividad);


server.listen(3000)

server.get('/actividades', (req, res) => {
    res.render('actividades');
});

server.get('/crearActividad', (req, res) => {
    res.render('crearActividad');
});

server.get('/IntroActividades', (req, res) => {
    res.render('IntroActividades');
});

server.get('/notaActividad', (req, res) => {
    res.render('notaActividad');
});

server.get('/PreguntaActividad', (req, res) => {
    res.render('PreguntaActividad');
});
