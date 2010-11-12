#!/usr/bin/env node

var sys = require('sys');
var exec = require('child_process').exec;

var puts = function(error, stdout, stderr) {
    sys.puts(stdout);
    sys.puts(stderr);
};

var execute = function(command, callback) {
    if (callback == null) {
        callback = puts;
    }
    exec(command, callback);
};

desc('Default task - runs tests');
task('default', ['test:run'], function (params) {
});

namespace('test', function() {

    desc('Runs unit tests');
    task('run', [], function (params) {
        execute('cd src/test && expresso')
    });

});

