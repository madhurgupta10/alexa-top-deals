var http = require('http');
var options = {
    host: 'top-deals-api.herokuapp.com',
    path: '/top'
};

var req = http.get(options, function (res) {

//    console.log('STATUS: ' + res.statusCode);

    var bodyChunks = [];
    res.on('data', function (chunk) {
        bodyChunks.push(chunk);
    }).on('end', function () {
        var body = Buffer.concat(bodyChunks);
        var obj = JSON.parse(body);
        console.log(obj['deal']);
        //console.log('' + body);
    })
});

