'use strict';


function ControladorCategoria() {}

ControladorCategoria.prototype = (function() {
    return {
        agregar_categoria: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_categoria(${nombre})', {
                        nombre: data.nombre
                    }
                );
                return h.response({
                    mensaje: 'categoria agregada',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar categoria',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        actualizar_categoria: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL editar_categoria(${id},${nombre})', {
                        id: data.id,
                        nombre: data.nombre
                    }
                );
                return h.response({
                    mensaje: 'categoria actualizado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al actualizar categoria',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        eliminar_categoria: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any('CALL eliminar_categoria(${id})', {
                    id: data.id
                });
                return h.response({
                    mensaje: 'categoria eliminada',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al eliminar el categoria',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },

    }
})();
let controlador_categoria = new ControladorCategoria();
module.exports = controlador_categoria;