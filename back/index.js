'use strict'

const Hapi = require('@hapi/hapi');
const hapiPgPromise = require('hapi-pg-promise');
const controlador_usuario = require('./controllers/usuario');
const controlador_autor = require('./controllers/autor');
const controlador_libro = require('./controllers/libro');
const controlador_login = require('./controllers/login');
const controlador_categoria = require('./controllers/categoria');
const controlador_editorial = require('./controllers/editorial');
const controlador_escribe_categorizado = require('./controllers/escribre_categorizado');
const controlador_compra = require('./controllers/compra');
require('dotenv').config();
const init = async() => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ["*"],
                headers: ["Accept", "Content-Type"],
                additionalHeaders: ["X-Requested-With"]
            }
        }
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
    server.route({ method: 'DELETE', path: '/eliminar_usuario/{correo}', handler: controlador_usuario.eliminar_usuario });
    server.route({ method: 'GET', path: '/lista_usuarios', handler: controlador_usuario.get_usuarios });
    server.route({ method: 'GET', path: '/obtener_usuario/{correo}', handler: controlador_usuario.get_usuario});

    server.route({ method: 'POST', path: '/agregar_autor', handler: controlador_autor.agregar_autor });
    server.route({ method: 'PUT', path: '/actualizar_autor', handler: controlador_autor.actualizar_autor });
    server.route({ method: 'DELETE', path: '/eliminar_autor/{id}', handler: controlador_autor.eliminar_autor });
    server.route({ method: 'GET', path: '/lista_autor',handler: controlador_autor.get_autor});

    server.route({ method: 'POST', path: '/agregar_libro', handler: controlador_libro.agregar_libro });
    server.route({ method: 'PUT', path: '/actualizar_libro', handler: controlador_libro.actualizar_libro });
    server.route({ method: 'DELETE', path: '/eliminar_libro/{codigo}', handler: controlador_libro.eliminar_libro });
    server.route({ method: 'GET', path: '/lista_libros', handler: controlador_libro.get_libros });
    server.route({ method: 'PUT', path: '/aumentar_stock', handler: controlador_libro.aumentar_stock });

    server.route({ method: 'POST', path: '/agregar_categoria', handler: controlador_categoria.agregar_categoria });
    server.route({ method: 'PUT', path: '/actualizar_categoria', handler: controlador_categoria.actualizar_categoria });
    server.route({ method: 'DELETE', path: '/eliminar_categoria/{id}', handler: controlador_categoria.eliminar_categoria });
    server.route({ method: 'GET', path: '/lista_categorias', handler: controlador_categoria.get_categorias });
    server.route({ method: 'GET', path: '/obtener_categoria/{id}', handler: controlador_categoria.get_categoria});
    
    
    server.route({method: 'POST', path: '/login', handler: controlador_login.login});

    server.route({ method: 'POST', path: '/agregar_editorial', handler: controlador_editorial.agregar_editorial });
    server.route({ method: 'PUT', path: '/actualizar_editorial', handler: controlador_editorial.actualizar_editorial });
    server.route({ method: 'DELETE', path: '/eliminar_editorial/{codigo}', handler: controlador_editorial.eliminar_editorial });
    server.route({ method: 'GET', path: '/lista_editoriales', handler: controlador_editorial.get_editoriales });
    server.route({ method: 'GET', path: '/obtener_editorial/{codigo}', handler: controlador_editorial.get_editorial});

    server.route({ method: 'POST', path: '/agregar_escribe', handler: controlador_escribe_categorizado.agregar_escribe });
    server.route({ method: 'PUT', path: '/actualizar_escribe', handler: controlador_escribe_categorizado.actualizar_escribe });

    server.route({ method: 'POST', path: '/agregar_categorizado', handler: controlador_escribe_categorizado.agregar_categorizado });
    server.route({ method: 'GET', path: '/lista_categorias/{codigo}', handler: controlador_escribe_categorizado.get_categorias_codigo});
    server.route({ method: 'GET', path: '/lista_categorias_asociadas/{codigo}', handler: controlador_escribe_categorizado.get_categorias_asociadas_codigo});
    server.route({ method: 'GET', path: '/lista_autores/{codigo}', handler: controlador_escribe_categorizado.get_autores_codigo});
    server.route({ method: 'GET', path: '/lista_autores_asociados/{codigo}', handler: controlador_escribe_categorizado.get_autores_asociados_codigo});
    server.route({ method: 'POST', path: '/agregar_compra', handler: controlador_compra.agregar_compra });



};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();