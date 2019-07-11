'use strict';


function ControladorLibro() {}

ControladorLibro.prototype = (function() {
    return {
        agregar_libro: async(request, h) => {
            console.log(request);
            let data = request.payload.info;
            console.log(data);
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
            let data = request.params;
            console.log("data",data);
            try {
                await request.db.any('CALL eliminar_libro(${id})', {
                    id: data.codigo
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
        get_libros: async(request, h) => {
            let data = request.payload;
            try {
                let datita= await request.db.any('SELECT * FROM todo_libros', {
                });
                return h.response({
                    mensaje: 'libros',
                    data: datita,
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
        aumentar_stock: async(request, h) => {
            let data = request.payload.info;
            try {
                await request.db.any(
                    'CALL aumentar_stock(${codigo},${stock})', {
                        codigo: data.codigo,
                        stock: data.stock
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
        

    }
})();
let controlador_libro = new ControladorLibro();
module.exports = controlador_libro;