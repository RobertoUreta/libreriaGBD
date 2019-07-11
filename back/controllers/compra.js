'use strict';


function ControladorCompra() {}

ControladorCompra.prototype = (function() {
    return {
        agregar_compra: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_compra(${cantidad},${ref_libro},${ref_usuario},${fecha})', {
                        cantidad: data.cantidad,
                        ref_libro: data.ref_libro,
                        ref_usuario: data.ref_usuario,
                        fecha: data.fecha,
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
        get_compras: async (request,h)=>{
            let data = request.params;
            
            try {
                console.log(data);
                //let select = 'SELECT * FROM compras_cliente WHERE usuario.correo = ' + "'" + data.c
                let datas=await request.db.any(
                    'SELECT * FROM compras_cliente WHERE compras_cliente.correo = ${correo}', {
                        correo: data.correo,
                    }
                );
                return h.response({
                    mensaje: 'compra agregada',
                    ok: true,
                    data: datas,
                }).code(200);  
            } catch (error) {
                return h.response({
                    mensaje: 'Error al retornar compra',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
            

        },
        actualizar_valoracion: async (request,h)=>{
            let data = request.payload.info;
            console.log("data",data);
            try {
                await request.db.any('CALL editar_valoracion_compra(${id_compra},${valoracion})',{
                id_compra: data.id,
                valoracion:data.valoracion,})
                return h.response({
                    mensaje: 'compra agregada',
                    ok: true
                }).code(200);

            } catch (error) {
                return h.response({
                    mensaje: 'Error al retornar compra',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        obtener_despachos: async (request,h)=>{
            let data = request.params;
            console.log(data)
            try {
                let datas = await request.db.any('SELECT * FROM despachos_cliente WHERE correo = ${correo}',{
                    correo: data.correo,
                })
                return h.response({
                    mensaje: 'compra agregada',
                    ok: true,
                    res: datas,
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al retornar desspachos',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        }
    }
})();
let controlador_compra = new ControladorCompra();
module.exports = controlador_compra;