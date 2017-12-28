var http = require('http');
var fs = require('fs');
var options = {
    host: 'top-deals-api.herokuapp.com',
    path: '/top'
};
//var t;
var req = http.get(options, function (res) {
    var bodyChunks = [];
    res.on('data', function (chunk) {
        bodyChunks.push(chunk);
    }).on('end', function (body) {
        var body = Buffer.concat(bodyChunks);
        body = "" + body;
        fs.writeFile('mydeals.txt', body, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    })
});