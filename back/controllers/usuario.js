'use strict';


function controlador_usuario() {}

controlador_usuario.prototype = (function() {
    return {
        agregar_usuario: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_usuario(${correo},${nombre},${ap_paterno},${ap_materno},${direccion},${ciudad},${tipo})', {
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
            let data = request.payload;
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
            let data = request.payload;
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
                    mensaje: 'Error al actualizar usuario',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },

    }
})();
let controlador_usuario = new controlador_usuario();
module.exports = controlador_usuario;