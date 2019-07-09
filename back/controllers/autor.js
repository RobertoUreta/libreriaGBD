'use strict';


function ControladorAutor() {}

ControladorAutor.prototype = (function() {
    return {
        agregar_autor: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL insertar_autor(${nombre},${ap_paterno},${ap_materno},${fec_nac},${nacionalidad},${lugar_nacimiento})', {
                        nombre: data.nombre,
                        ap_paterno: data.ap_paterno,
                        ap_materno: data.ap_materno,
                        fec_nac: data.fec_nac,
                        nacionalidad: data.nacionalidad,
                        lugar_nacimiento: data.lugar_nacimiento
                    }
                );
                return h.response({
                    mensaje: 'Autor agregado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al agregar autor',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        actualizar_autor: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any(
                    'CALL editar_autor(${id},${nombre},${ap_paterno},${ap_materno},${fec_nac},${nacionalidad},${lugar_nacimiento})', {
                        id: data.id,
                        nombre: data.nombre,
                        ap_paterno: data.ap_paterno,
                        ap_materno: data.ap_materno,
                        fec_nac: data.fec_nac,
                        nacionalidad: data.nacionalidad,
                        lugar_nacimiento: data.lugar_nacimiento
                    }
                );
                return h.response({
                    mensaje: 'Autor actualizado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al actualizar autor',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        eliminar_autor: async(request, h) => {
            let data = request.payload;
            try {
                await request.db.any('CALL eliminar_autor(${id})', {
                    id: data.id
                });
                return h.response({
                    mensaje: 'Autor eliminado',
                    ok: true
                }).code(200);
            } catch (error) {
                return h.response({
                    mensaje: 'Error al eliminar el autor',
                    ok: false,
                    error_mensaje: error.message,
                    error: error
                }).code(500);
            }
        },
        get_autor: async(request,h) =>{
           let datas = {};
           let select = 'SELECT * FROM todo_autor'
           let existe = false;
           try {
                await request.db.any (select)
                .then(function(data){
                    if(Array.isArray(data) && data.length){
                        
                        datas= data;
                        existe = true;
                    }
                })
                .catch(function(error){
                    console.log(error);
                })    
           } catch (error) {
               console.log(error)
           }

           if (existe == true) {
            
            return h.response(datas).code(201);
            } else {
            return h.response({ msg: 'usuario fallido' }).code(401);
            }
        },

    }
})();
let controlador_autor = new ControladorAutor();
module.exports = controlador_autor;