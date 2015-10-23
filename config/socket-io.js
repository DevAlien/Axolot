module.exports = function(server, config) {
    var io = require('socket.io')(server);
    if (config && config.pwd && config.host && config.port) {
        var redis = require('redis').createClient;
        var adapter = require('socket.io-redis');
        var pub = redis(config.port, config.host, { return_buffers: true, auth_pass: config.pwd });
        var sub = redis(config.port, config.host, { return_buffers: true, auth_pass: config.pwd });
        io.adapter(adapter({ pubClient: pub, subClient: sub }));
    } else if (config && config.host && config.port) {
        var redis = require('socket.io-redis');
        io.adapter(redis({ host: config.host, port: config.port }));
    }
    // Socket.io can be configured here before being loaded in app.js

    io.use(function(socket, next) {
        var token = socket.handshake.query.token || null;
        Service.token.verify(token, function(err, decoded) {
            if (err) { return next(err); }
            if (!decoded) { return next(new Error('not authorized')); }

            socket.user = decoded;
            next();
        });
    });

    return io;
};
