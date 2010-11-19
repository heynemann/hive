require.paths.push(__dirname);
var http = require('http');
var app = module.exports = require('settings').app;

// Routes

app.get('/', function(req, res){
    res.render('index', {
        locals: {
            title: 'Express'
        }
    });
});

var getUrl = function(res, host, port, url) {
    var request = http.createClient(port, host).request('GET', url, {});
    request.addListener('response', function (response) {
        res.writeHead(response.statusCode, response.headers);
        response.addListener('data', function (chunk) {
            res.write(chunk);
        });
        response.addListener('end', function () {
            res.end();
        });
    });
    request.end();
};

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
