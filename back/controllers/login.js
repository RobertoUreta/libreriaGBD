'use strict';

function ControladorLogin(){}

ControladorLogin.prototype =(function (){
    return {
        login: async function login(request,h){
            let datos = request.payload;
            console.log("datos: ",datos)
            let existe = false;
            let nombre = '';
            let datas= {};
            let select = 'SELECT * FROM login WHERE contrasenia= ' +"'"+datos.contrasena+"'"+ ' AND correo= ' +"'"+datos.email+ "'"
            console.log(select)
            try {
                await request.db.any (select)
                .then(function(data){
                    if(Array.isArray(data) && data.length){
                        console.log(data)
                        datas= data;
                        existe = true;
                    }
                })
                .catch(function(error){
                    console.log(error);
                })    
            } catch (error) {
                console.log(error);
            }
            
            if (existe == true) {
                console.log(datas)
                return h.response(datas).code(201);
            } else {
                return h.response({ msg: 'usuario fallido' }).code(401);
            }
        }
    }
})();
let controlador_login = new ControladorLogin();
module.exports = controlador_login;