'use strict';


function ControladorUsuario() {}

ControladorUsuario.prototype = (function() {
    return {
        agregar_usuario: async(request, h) => {
            let data = request.payload.info;
            try {
                await request.db.any(
                    'CALL insertar_usuario(${correo},${contrasenia},${nombre},${ap_paterno},${ap_materno},${direccion},${ciudad},${tipo})', {
                        correo: data.correo,
                        contrasenia: data.contrasenia,
                        nombre: data.nombre,
                        ap_paterno: data.ap_paterno,
                        ap_materno: data.ap_materno,
                        direccion: data.direccion,
                        ciudad: data.ciudad,
                        tipo: parseInt(data.tipo)
                    }
                );
                return h.response({
                    mensaje: 'Usuario agregado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar usuario',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        actualizar_usuario: async(request, h) => {
            let data = request.payload.info;
            try {
                await request.db.any(
                    'CALL editar_usuario(${correo},${nombre},${ap_paterno},${ap_materno},${direccion},${ciudad},${tipo})', {
                        correo: data.correo,
                        nombre: data.nombre,
                        ap_paterno: data.ap_paterno,
                        ap_materno: data.ap_materno,
                        direccion: data.direccion,
                        ciudad: data.ciudad,
                        tipo: parseInt(data.tipo)
                    }
                );
                return h.response({
                    mensaje: 'Usuario actualizado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al actualizar usuario',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        eliminar_usuario: async(request, h) => {
            let data = request.params;
            try {
                await request.db.any('CALL eliminar_usuario(${correo})', {
                    correo: data.correo
                });
                return h.response({
                    mensaje: 'Usuario eliminado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al eliminar usuario',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        get_usuarios:async(request, h) => {
            let data = request.payload;
            try {
                let datita= await request.db.any('SELECT * FROM todo_usuarios', {
                });
                return h.response({
                    mensaje: 'usuarios',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Problemas al obtener usuarios',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        get_usuario:async(request, h) => {
            let data = request.params;
            console.log(data);
            try {
                let datita= await request.db.any('SELECT * FROM todo_usuarios WHERE correo=${correo}', {
                    correo: data.correo
                });
                return h.response({
                    mensaje: 'usuario',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Problemas al obtener usuario',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },

    }
})();
let controlador_usuario = new ControladorUsuario();
module.exports = controlador_usuario;