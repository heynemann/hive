var rapid = require('rapid');

exports.RegisteredApi = rapid.model('RegisteredApi', {
    name : { type: 'string', required: true },
    url  : { type: 'string', required: true }
});
