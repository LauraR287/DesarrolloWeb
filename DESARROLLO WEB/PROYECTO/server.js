import express, {json} from 'express';
import {modeloUsuario} from './model/user.js';
import { join } from 'path';
import {_dirname} from "./util/_dirname.js"
import { mostrarPerfil, crearUsuario, iniciarSesion, recuperarContraseña, actualizarPerfil, renderizarEditarPerfil, cerrarSesion } from './controller/controladorUsuarios.js';
import { conectarBaseDeDatos } from './config/database.js';
import path from 'path'; 
import session from "express-session";


const server = express();
conectarBaseDeDatos()

server.set("view engine", "ejs")
server.set('views', path.join(_dirname, 'views'));

server.use(express.urlencoded({extended: true}));
server.use(express.static('assets'));
server.use(json())

server.get('/usuarios', mostrarPerfil)
server.post('/usuarios', crearUsuario)
server.post('/usuarios/login', iniciarSesion)
server.get("/perfil", mostrarPerfil);
server.post("/usuarios/recuperar", recuperarContraseña);
server.post("/actualizarPerfil", actualizarPerfil);
server.get("/editarPerfil", renderizarEditarPerfil);
server.get("/cerrarSesion", cerrarSesion);


server.listen(3000)

server.get('/editarPerfil', (req, res) => {
    res.render('editarPerfil');
});

server.get('/actividades', (req, res) => {
    res.render('actividades');
});

server.get('/examenes', (req, res) => {
    res.render('examenes');
});

server.get('/pantallaPrincipal', (req, res) => {
    res.render('pantallaPrincipal');
});

server.get('/crearCuenta', (req, res) => {
    res.render('crearCuenta');
});

server.get('/inicioSesion', (req, res) => {
    res.render('inicioSesion');
});

server.get('/perfil', (req, res) => {
    res.render('perfil');
});

server.get('/recuperarCuenta', (req, res) => {
    res.render('recuperarCuenta'); 
});