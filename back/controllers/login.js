'use strict';

function ControladorLogin(){}

ControladorLogin.prototype =(function (){
    return {
        login: async function login(request,h){
            let datos = request.payload;
            let existe = false;
            let nombre;
            await request.db.any ('SELECT * FROM login WHERE contrasenia= $1 AND correo = $2',
            [datos.correo, datos.contrasenia])
            .then(function(data){
                if(Array.isArray(data) && data.length){
                    nombre= data.nombre;
                    existe = true;
                }
            })
            .catch(function(error){
                console.log(error);
            })
            if (existe == true) {
                return h.response(nombre).code(201);
            } else {
                return h.response({ msg: 'usuario fallido' }).code(401);
            }
        }
    }
})();
let controlador_login = new ControladorLogin();
module.exports = controlador_login;