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
        },
        get_categorias_codigo: async(request, h) => {
            let data = request.params;
            try {
                console.log("holaa");
                let datita= await request.db.any('SELECT * FROM todo_categorias WHERE id NOT IN (SELECT ref_categoria FROM categorizado WHERE ref_libro=${codigo})', {
                    codigo: data.codigo
                });
                console.log("data",datita);
                return h.response({
                    mensaje: 'categorias',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener categorias',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        get_categorias_asociadas_codigo: async(request, h) => {
            let data = request.params;
            try {
                console.log("holaa");
                let datita= await request.db.any('SELECT todo_categorias.* FROM todo_categorias,categorizado WHERE todo_categorias.id=categorizado.ref_categoria AND categorizado.ref_libro=${codigo}', {
                    codigo: data.codigo
                });
                console.log("data",datita);
                return h.response({
                    mensaje: 'categorias',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener categorias',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        get_autores_codigo: async(request, h) => {
            let data = request.params;
            try {
                console.log("holaa");
                let datita= await request.db.any('SELECT * FROM todo_autor WHERE id NOT IN (SELECT ref_autor FROM escribe WHERE ref_libro=${codigo})', {
                    codigo: data.codigo
                });
                console.log("data",datita);
                return h.response({
                    mensaje: 'autores que no estan asociado a cierto libro',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener autores',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        get_autores_asociados_codigo: async(request, h) => {
            let data = request.params;
            try {
                let datita= await request.db.any('SELECT todo_autor.*,escribe.fecha_escritura FROM todo_autor,escribe WHERE todo_autor.id=escribe.ref_autor AND escribe.ref_libro=${codigo}', {
                    codigo: data.codigo
                });
                return h.response({
                    mensaje: 'autores que estan asociado a cierto libro',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener autores',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
    }
})();
let controlador_escribe_categorizado = new ControladorEscribeCategorizado();
module.exports = controlador_escribe_categorizado;