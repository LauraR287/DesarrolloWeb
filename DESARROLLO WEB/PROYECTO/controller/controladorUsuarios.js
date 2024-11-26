import { model } from "mongoose";
import { modeloUsuario } from "../model/user.js";

let usuarioEnSesion = null;

export const mostrarPerfil = (req, res) => {
    try {
        if (!usuarioEnSesion) {
            return res.redirect("/inicioSesion"); // Redirige si no hay un usuario en sesión
        }

        // Pasa los datos del usuario en sesión a la vista
        res.render("perfil", { usuario: usuarioEnSesion });
    } catch (error) {
        console.error("Error al mostrar el perfil:", error);
        res.status(500).send("Error interno al mostrar el perfil.");
    }
};


export const cerrarSesion = (req, res) => {
    usuarioEnSesion = null;
    res.redirect("/inicioSesion");
};


export const crearUsuario = async(peticion, respuesta) => {
    try{
        let data = peticion.body;
        console.log(data);
        const mensajeAlerta = await modeloUsuario.find()

        const usuarioExistente = await modeloUsuario.findOne({ correo: data.correo });
        if (usuarioExistente) {
            return respuesta.render("crearCuenta", {
                mensajeAlerta: "El correo ya está registrado. Por favor, utiliza otro.",
                tipoAlerta: "error"
            });
        }

        await modeloUsuario.create(data);
        respuesta.render("crearCuenta", {
            mensajeAlerta: "Usuario creado de forma exitosa", 
            tipoAlerta: "success"
        });

    } catch(error){
        console.log(error)
        respuesta.render("crearCuenta", {
            mensajeAlerta: "Hubo errores creando tu cuenta", 
            tipoAlerta: "error"
        });
    }
}

export const iniciarSesion = async (peticion, respuesta) => {
    try {
        const { correo, contraseña } = peticion.body;
        const mensajeAlerta = await modeloUsuario.find()

        // Verificar si el usuario existe
        const usuario = await modeloUsuario.findOne({ correo });
        if (!usuario) {
            return respuesta.render("inicioSesion", {
                mensajeAlerta: "Correo o contraseña incorrectos.",
                tipoAlerta: "error"
            });
        }

        // Verificar la contraseña
        if (contraseña !== usuario.contraseña) {
            return respuesta.render("inicioSesion", {
                mensajeAlerta: "Correo o contraseña incorrectos.",
                tipoAlerta: "error"
            });
        }

        usuarioEnSesion = {
            id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo
        };

        console.log("Usuario en sesión:", usuarioEnSesion);
respuesta.render("perfil", { usuario: usuarioEnSesion });

        // Si las credenciales son correctas
        respuesta.render("perfil", { usuario: usuarioEnSesion }, {
            mensajeAlerta: `Bienvenido, ${usuario.nombre}!`,
            tipoAlerta: "success"
        }, { usuario: usuarioEnSesion });

    } catch (error) {
        console.log("Error al iniciar sesión:", error);
        respuesta.render("inicioSesion", {
            mensajeAlerta: "Hubo un error al iniciar sesión. Inténtalo nuevamente.",
            tipoAlerta: "error"
        });
    }
};

export const recuperarContraseña = async (peticion, respuesta) => {
    try {
        const { correo } = peticion.body;
        const mensajeAlerta = await modeloUsuario.find()

        if (!correo) {
            return respuesta.render("recuperarCuenta", {
                mensajeAlerta: "Por favor, ingresa un correo válido.",
                tipoAlerta: "error"
            });
        }

        const usuario = await modeloUsuario.findOne({ correo });
        if (!usuario) {
            return respuesta.render("recuperarCuenta", {
                mensajeAlerta: "El correo ingresado no está registrado.",
                tipoAlerta: "error"
            });
        }

        const nuevaContraseña = Math.random().toString(36).slice(-8);
        usuario.contraseña = nuevaContraseña;
        await usuario.save();

        console.log(`Nueva contraseña generada para ${correo}: ${nuevaContraseña}`);

        respuesta.render("recuperarCuenta", {
            mensajeAlerta: "Se ha generado una nueva contraseña. Revisa tu correo.",
            tipoAlerta: "success"
        });
    } catch (error) {
        console.log("Error al recuperar contraseña:", error);

        respuesta.render("recuperarCuenta", {
            mensajeAlerta: "Hubo un error al recuperar la contraseña. Inténtalo nuevamente.",
            tipoAlerta: "error"
        });
    }
};

export const renderizarEditarPerfil = (req, res) => {
    if (!usuarioEnSesion) {
        return res.redirect("/inicioSesion"); // Redirige si no hay sesión activa
    }

    // Pasa la variable `usuario` con los datos de `usuarioEnSesion` a la vista
    res.render("editarPerfil", { usuario: usuarioEnSesion });
};


export const actualizarPerfil = async (req, res) => {
    try {
        const { nombre, apellido, correo } = req.body;

        if (!usuarioEnSesion || !usuarioEnSesion.id) {
            console.log("No hay un usuario en sesión");
            return res.redirect("/inicioSesion"); // Redirige si no hay sesión activa
        }

        // Actualizar los datos del usuario en la base de datos
        const usuario = await modeloUsuario.findByIdAndUpdate(
            usuarioEnSesion.id, // Identificador del usuario en sesión
            { nombre, apellido, correo }, // Datos a actualizar
            { new: true } // Devuelve el documento actualizado
        );

        if (!usuario) {
            console.log("Usuario no encontrado en la base de datos.");
            return res.status(404).render("error", { mensaje: "Usuario no encontrado." });
        }

        // Actualizar la variable de sesión con los nuevos datos
        usuarioEnSesion = {
            id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo
        };

        console.log("Usuario en sesión actualizado:", usuarioEnSesion);

        res.redirect("/perfil"); // Redirige al perfil actualizado
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        res.status(500).render("error", { mensaje: "Hubo un error al actualizar el perfil." });
    }
};
