'use strict'

const Hapi = require('@hapi/hapi');
const hapiPgPromise = require('hapi-pg-promise');
const controlador_usuario = require('./controllers/usuario');
const controlador_autor = require('./controllers/autor');
const controlador_libro = require('./controllers/libro');
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

    server.route({ method: 'POST', path: '/agregar_autor', handler: controlador_autor.agregar_autor });
    server.route({ method: 'PUT', path: '/actualizar_autor', handler: controlador_autor.actualizar_autor });
    server.route({ method: 'DELETE', path: '/eliminar_autor', handler: controlador_autor.eliminar_autor });

    server.route({ method: 'POST', path: '/agregar_libro', handler: controlador_libro.agregar_libro });
    server.route({ method: 'PUT', path: '/actualizar_libro', handler: controlador_libro.actualizar_libro });
    server.route({ method: 'DELETE', path: '/eliminar_libro', handler: controlador_libro.eliminar_libro });



};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();