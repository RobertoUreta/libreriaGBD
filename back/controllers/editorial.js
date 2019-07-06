'use strict';


function ControladorEditorial() {}

ControladorEditorial.prototype = (function() {
    return {
        agregar_editorial: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_editorial(${nombre},${telefono},${direccion},${ciudad})', {
                        nombre: data.nombre,
                        telefono: data.telefono,
                        direccion: data.direccion,
                        ciudad: data.ciudad
                    }
                );
                return h.response({
                    mensaje: 'editorial agregada',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar editorial',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        actualizar_editorial: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL editar_editorial(${id},${nombre},${telefono},${direccion},${ciudad})', {
                        id: data.id,
                        nombre: data.nombre,
                        telefono: data.telefono,
                        direccion: data.direccion,
                        ciudad: data.ciudad
                    }
                );
                return h.response({
                    mensaje: 'editorial actualizado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al actualizar editorial',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        eliminar_editorial: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any('CALL eliminar_editorial(${id})', {
                    id: data.id
                });
                return h.response({
                    mensaje: 'editorial eliminada',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al eliminar el editorial',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },

    }
})();
let controlador_editorial = new ControladorEditorial();
module.exports = controlador_editorial;