'use strict';


function ControladorCompra() {}

ControladorCompra.prototype = (function() {
    return {
        agregar_compra: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_compra(${cantidad},${ref_libro},${ref_usuario})', {
                        cantidad: data.cantidad,
                        ref_libro: data.ref_libro,
                        ref_usuario: data.ref_usuario
                    }
                );
                return h.response({
                    mensaje: 'compra agregada',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar compra',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
    }
})();
let controlador_compra = new ControladorCompra();
module.exports = controlador_compra;