var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var fs = require('fs');

module.exports = function (app, config, passport, mountMiddlewareCb) {
    var stats;
    try {
        stats = fs.lstatSync(config.root + '/config/express.js');
    }
    catch (e) {
        
    }
    if (stats) {
        require(config.root + '/config/express.js')(app, config);
    }
    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json({limit: config.bodyLimit || '1mb'}));
    app.use(bodyParser.urlencoded({
        limit: config.bodyLimit || '1mb',
        extended: true
    }));

    app.use(passport.initialize());
    app.passport = passport;
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());
    
    // Mount our middleware (controllers, routes) before the status code handlers
    mountMiddlewareCb();


    

    // Status code handlers
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err,
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {},
        });
    });

};
