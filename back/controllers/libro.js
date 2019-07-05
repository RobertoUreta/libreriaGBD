'use strict';


function ControladorLibro() {}

ControladorLibro.prototype = (function() {
    return {
        agregar_libro: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_libro(${titulo},${edicion},${paginas},${precio},${fecha},${idioma},${ref_editorial})', {
                        titulo: data.titulo,
                        edicion: data.edicion,
                        paginas: data.paginas,
                        precio: data.precio,
                        fecha: data.fecha,
                        idioma: data.idioma,
                        ref_editorial: data.ref_editorial
                    }
                );
                return h.response({
                    mensaje: 'libro agregado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar libro',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        actualizar_libro: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL editar_libro(${id},${precio})', {
                        id: data.id,
                        precio: data.precio
                    }
                );
                return h.response({
                    mensaje: 'libro actualizado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al actualizar libro',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        eliminar_libro: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any('CALL eliminar_libro(${id})', {
                    id: data.id
                });
                return h.response({
                    mensaje: 'libro eliminado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al eliminar el libro',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },

    }
})();
let controlador_libro = new ControladorLibro();
module.exports = controlador_libro;