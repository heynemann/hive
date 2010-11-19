
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var http = require('http');

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router); 
    app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
    res.render('index.jade', {
        locals: {
            title: 'Express'
        }
    });
});

function getUrl(res, host, port, url) {
    var request = http.createClient(port, host).request("GET", url, {});
    request.addListener("response", function (response) {
        res.writeHead(response.statusCode, response.headers);
        response.addListener("data", function (chunk) {
            res.write(chunk);
        });
        response.addListener("end", function () {
            res.end();
        });
    });
    request.end();
}

app.get(/^\/hive\/ping\/?(.*)$/, function(req, res) {
    var msg = 'pong';
    if (req.params[0]) {
        msg += '\n' + req.params[0];
    }
    res.send(msg);
});

app.get(/^\/([^/]+)\/([^/]+)\/?(.*)$/, function(req, res){
    var user = req.params[0];
    var api = req.params[1];
    var rest = req.params[2];

    if (user == 'hive' && api == 'apiping') {
        var host = "localhost"
        var url = "/hive/ping/" + rest;
        var port = 3000;
        getUrl(res, host, port, url);
        return;
    }

    res.send('API NOT FOUND!');
});

// Only listen on $ node app.js

if (!module.parent) {
    app.listen(3000);
    console.log('Express server listening on port %d', app.address().port);
}
