'use strict';


function ControladorReporte() {}

ControladorReporte.prototype = (function() {
    return {
        reporte1: async(request, h) => {
            try {
                let datita= await request.db.any('SELECT * FROM reporte1', {
                });
                return h.response({
                    mensaje: 'reportes',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener reportes',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        reporte2: async(request, h) => {
            try {
                let datita= await request.db.any('SELECT * FROM reporte2', {
                });
                return h.response({
                    mensaje: 'reportes',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener reportes',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        reporte3: async(request, h) => {
            try {
                let datita= await request.db.any('SELECT * FROM reporte3', {
                });
                return h.response({
                    mensaje: 'reportes',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener reportes',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        reporte4: async(request, h) => {
            try {
                let datita= await request.db.any('SELECT * FROM reporte4', {
                });
                return h.response({
                    mensaje: 'reportes',
                    data: datita,
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al obtener reportes',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },

    }
})();
let controlador_reporte = new ControladorReporte();
module.exports = controlador_reporte;