function dealer(query) {
    var http = require('http');
    var options = {
        host: 'top-deals-api.herokuapp.com',
        path: '/'+query
    };

    var req = http.get(options, function (res) {

//      console.log('STATUS: ' + res.statusCode);
        if (res.statusCode+'' == '200') {
            var bodyChunks = [];
            res.on('data', function (chunk) {
                bodyChunks.push(chunk);
            }).on('end', function () {
                var body = Buffer.concat(bodyChunks);
                var obj = JSON.parse(body);
                console.log(obj['deal']);
                return obj;
//              console.log('' + body);
            })
        } 
        else {
            return null;
        }
    });
}

var r = dealer("top");
console.log(r);