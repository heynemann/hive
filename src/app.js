require.paths.push(__dirname);

var http = require('http');
var app = module.exports = require('settings').app;

var rapid = require('rapid');

var models = require('models')
var proxy = require('proxy');

// Routes

app.get('/', function(req, res){
    models.RegisteredApi.all(function(err, apis) {
        res.render('index', {
            locals: {
                title: 'Express',
                apis: apis
            }
        });
    });
});

app.get('/apis/new', function(req, res) {
    res.render('newapi', {
        locals: {
            title: 'New API'
        }
    });
});

app.post('/apis/create', function(req, res) {
    var api = new models.RegisteredApi({
        name: req.body.name_field,
        url: req.body.source_url_field
    });
    
    api.save(function(err) {
        res.redirect('/');
    });
});

app.get(/^\/hive\/ping\/?(.*)$/, function(req, res) {
    var msg = 'pong';
    if (req.params[0]) {
        msg += '\n' + req.params[0];
    }
    res.send(msg);
});

app.get(/^\/([^\/]+)\/([^\/]+)\/?(.*)$/, function(req, res){
    var user = req.params[0];
    var api = req.params[1];
    var rest = req.params[2];

    if (user == 'hive' && api == 'apiping') {
        var host = 'localhost';
        var url = '/hive/ping/' + rest;
        var port = 3000;
        proxy.get(res, host, port, url);
        return;
    }

    res.send('API NOT FOUND!');
});

// Only listen on $ node app.js

if (!module.parent) {
    app.listen(3000);
    console.log('Express server listening on port %d', app.address().port);
}
