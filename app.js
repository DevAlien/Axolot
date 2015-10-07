var _ = require('lodash'),
    express = require('express'),
    passport = require('passport'),
    requireAll = require('require-all'),
    config = require('./config/config'),
    path = require('path'),
    waterline = require('waterline'),
    baseModel = require('./lib/model'),
    token = require('./lib/token');

// Instantiate a new instance of the ORM
var orm = new waterline();

var rootPath = path.normalize(process.cwd() + '/api');

var app = express();
var server = require('http').createServer(app);
global.checkScopes = require('./lib/helper.js').checkScopes;

// Require all models, controllers
var models = requireAll(rootPath + '/models'),
    controllers = requireAll(rootPath + '/controllers'),
    routes = requireAll(rootPath + '/routes');

// Load models into waterline
_.each(models, function (model) {
    orm.loadCollection(waterline.Collection.extend(new baseModel(model)));
});

orm.initialize(config.orm, function (err, models) {
    if (err) throw err;

    app.models = models.collections;
    app.databases = models.connections;

    global.Model = app.models;
    app.config = config;

    // Configure passport
    require('./config/passport')(passport);

    // Configure express
    require('./config/express')(app, config.app, passport, function () {

        // Load routes
        app.routes = {};
        _.each(routes, function (route, key) {
            app.routes[key] = route(app);
        });

        // Load services
        var services = requireAll(rootPath + '/services');
        app.services = {token: token};
        global.Service = {token: token};
        _.each(services, function (service, key) {
            app.services[key] = service;
            service.config = config;
            global.Service[key] = service;
        });

        // Initialize services that need to be so
        Service.token.initialize({secret: config.secrets.token});

        // Configure and load listen socket
        app.sockets = require('./config/socket-io')(server, config['redisio']);
        SocketIO = app.sockets;
        // Load controllers
        app.controllers = {};

        var controllerBuilder = require('./lib/controllerBuilder');
        var controllerBuilders = {};

        _.each(controllers, function (controller, key) {
            controller.identity = key;

            var builder = new controllerBuilder(app, controller);
            controllerBuilders[key] = builder;
            app.controllers[key] = controller;
            builder.buildActions();
        });

        // Bind controller sockets on incoming connections
        app.sockets.on('connection', function (socket) {
            // add a user to a room with it's same ID
            socket.join(socket.user.id);
            // Bind each controller's socket handlers for this connection
            _.each(controllerBuilders, function (builder) {
                builder.buildSockets(socket);
            });
        });

    });
    server.on('uncaughtException', function ( requst, response, route, error) {
        console.log(error.stack());
    })
    server.listen(config.app.port, function () {
        app.started = true;
        console.log(config.app.name + ' server listening on port ' + config.app.port);
    });

});

exports.app = app;
