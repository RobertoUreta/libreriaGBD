'use strict';


function ControladorEditorial() {}

ControladorEditorial.prototype = (function() {
    return {
        agregar_editorial: async(request, h) => {
            let data = request.payload.info;
            console.log(data);
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
            let data = request.payload.info;
            console.log(data);
            try {
                await request.db.any(
                    'CALL editar_editorial(${id},${nombre},${telefono},${direccion},${ciudad})', {
                        id: data.codigo,
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
        get_editoriales: async(request, h) => {
            let data = request.payload;
            try {
                let datita= await request.db.any('SELECT  editorial.* FROM editorial', {
                });
                return h.response({
                    mensaje: 'editorial',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener editoriales',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        get_editorial:async(request, h) => {
            let data = request.params;
            console.log(data);
            try {
                let datita= await request.db.any('SELECT editorial.* FROM editorial WHERE codigo=${codigo}', {
                    codigo: data.codigo
                });
                return h.response({
                    mensaje: 'editorial',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Problemas al obtener editorial',
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