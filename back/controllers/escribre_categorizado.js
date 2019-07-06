'use strict';


function ControladorEscribeCategorizado() {}

ControladorEscribeCategorizado.prototype = (function() {
    return {
        agregar_escribe: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_escribe(${ref_autor},${ref_libro},${fecha_escritura})', {
                        ref_autor: data.ref_autor,
                        ref_libro: data.ref_libro,
                        fecha_escritura: data.fecha_escritura
                    }
                );
                return h.response({
                    mensaje: 'escribe agregada',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar escribe',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        actualizar_escribe: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL editar_escribe(${ref_autor},${ref_libro},${fecha_escritura})', {
                        ref_autor: data.ref_autor,
                        ref_libro: data.ref_libro,
                        fecha_escritura: data.fecha_escritura
                    }
                );
                return h.response({
                    mensaje: 'escribe actualizado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al actualizar escribe',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        agregar_categorizado: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_categorizado(${ref_libro},${ref_categoria})', {
                        ref_libro: data.ref_libro,
                        ref_categoria: data.ref_categoria
                    }
                );
                return h.response({
                    mensaje: 'categorizado agregado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar categorizado',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        }
    }
})();
let controlador_escribe_categorizado = new ControladorEscribeCategorizado();
module.exports = controlador_escribe_categorizado;