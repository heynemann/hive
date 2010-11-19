require.paths.push(__dirname);
var http = require('http');

var proxy = {
    'get': function(res, host, port, url) {
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
    }
};
