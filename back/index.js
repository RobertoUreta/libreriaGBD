'use strict'

const Hapi = require('@hapi/hapi');
const hapiPgPromise = require('hapi-pg-promise');
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