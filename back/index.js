'use strict'

const Hapi = require('@hapi/hapi');
const hapiPgPromise = require('hapi-pg-promise')
const init = async() => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    const pluginPg = {
        plugin: hapiPgPromise,
        options: {
            cn: 'postgres://postgres:123456@localhost:5432/libreria'
        }
    }

    await server.register(pluginPg);

    await server.start();
    console.log('Server corriendo en %s', server.info.uri);
    server.route({
        method: 'GET',
        path: '/',
        handler: async(request, h) => {
            let select = 'SELECT * FROM autor'
            try {
                let data = await request.db.any(select);
                console.log(data);
                return 'Hola mundo';
            } catch (error) {
                console.log(error);
            }
            return 'Holi';


        }
    });


};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();