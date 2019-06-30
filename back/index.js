'use strict'

const Hapi = require('@hapi/hapi');
const hapiPgPromise = require('hapi-pg-promise');
const controlador_usuario = require('./controllers/usuario');
require('dotenv').config();
const init = async() => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    });

    const pluginPg = {
        plugin: hapiPgPromise,
        options: {
            cn: process.env.DB_CONNECTION
        }
    }

    await server.register(pluginPg);

    await server.start();
    console.log('Server corriendo en %s', server.info.uri);
    server.route({ method: 'POST', path: '/agregar_usuario', handler: controlador_usuario.agregar_usuario });
    server.route({ method: 'PUT', path: '/actualizar_usuario', handler: controlador_usuario.actualizar_usuario });
    server.route({ method: 'DELETE', path: '/eliminar_usuario', handler: controlador_usuario.eliminar_usuario });


};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();