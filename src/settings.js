/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports.app = express.createServer();
var redisStore = require('connect-redis');

// Configuration

app.configure(function(){
    app.set('view engine', 'haml');
    app.set('views', __dirname + '/views');
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public'));

    //use req.session to access the store
    //in your routes and req.session.client 
    //to access redis-client client object.¬
    app.use(express.session({
        store: new redisStore({
                maxAge: 300000
            })
        })
    );
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});
