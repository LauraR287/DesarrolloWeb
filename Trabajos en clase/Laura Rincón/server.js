import express from 'express';

const server = express();

server.get('/Welcome', (peticion, respuesta) => {
    respuesta.send("Bienvenido al servidor")
})
server.listen(3000, ()=>console.log(`Servidor corriendo en puerto ${3000}`))