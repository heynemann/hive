
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

app.get(/^\/([^\/]+)\/([^\/]+)\/(.+)$/, function(req, res){
    var user = req.params[0];
    var api = req.params[1];
    var rest = req.params[2];

    if (user == 'google') {
        var url = 'http://www.google.com/#hl=en-US&source=hp&biw=1920&bih=943&q=' + rest + '&aq=f&aqi=&aql=&oq=&gs_rfai=&fp=6da77184950732af';
        console.log(url);
        var google = http.createClient(80, 'www.google.com');
        var request = google.request('GET', '/',
          {'host': url});
        request.end();
        request.on('response', function (response) {
            response.setEncoding('utf8');
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function() {
                res.send(body);
            });
        });
    }
});

// Only listen on $ node app.js

if (!module.parent) {
    app.listen(3000);
    console.log('Express server listening on port %d', app.address().port);
}
