'use strict';

const Config = require('./config');

// Glue manifest
module.exports = {

    server: {
        app: {
            config: Config
        }
    },

    connections: [
        {
            host: Config.server.host,
            port: Config.server.port,
            labels: 'api',
            routes: {
                cors: true
            }
        }
    ],

    registrations: [
        {
            plugin: {
                register: 'dogwater',
                options: Config.dogwater
            }
        },
        {
            plugin: {
                register: 'poop',
                options: Config.poop
            }
        },
        {
            plugin: {
                register: 'bassmaster',
                options: {
                    batchEndpoint: '/',
                    tags: ['bassmaster', 'batch']
                }
            }
        },
        {
            plugin: './boilerplate-swagger'
        },
        {
            plugin: './pinger'
        },
        {
            plugin: {
                register: '../lib',
                options: {}
            }
        }
    ]

};

if ( process.env.NODE_ENV === 'dev' ) {
    module.exports.server.debug = {
        log: ['error', 'implementation', 'internal'],
        request: ['error', 'implementation', 'internal']
    };
}
