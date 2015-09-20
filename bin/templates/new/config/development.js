// Development environment

// Application configuration
var rootPath = require('path').normalize(__dirname + '/..');

exports.app = {
    root: rootPath,
    name: '{{ name }}',
    port: process.env.PORT || 3000
};

// Secrets
exports.secrets = {
    token: 'NOTSOSECRET'
};

// Waterline ORM configuration
var mongoAdapter = require('sails-mongo');

exports.orm = {
    adapters: {
        'mongo': mongoAdapter
    },
    connections: {
        'default': {
            adapter: 'mongo',
            host: 'localhost',
            database: '{{ name }}'
        }
    },
    defaults: {
        migrate: 'safe'
    }
};