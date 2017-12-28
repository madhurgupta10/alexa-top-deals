var http = require('http');
var fs = require('fs');
function finder(data) {
    dealer("top");
    fs.readFile('mydeals.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = JSON.parse(data);
        data = data;
        data = data['deal'][0]['deal'];
        answer = data;
        return data;
        // console.log(data);
    });
}

function dealer(query) {
    var options = {
        host: 'top-deals-api.herokuapp.com',
        path: '/' + query
    };

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
}
finder("top");
setTimeout(function () { console.log(answer) }, 1000);