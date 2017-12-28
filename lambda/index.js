"use strict";
var Alexa = require("alexa-sdk");
var http = require('http');
var fs = require('fs');
var SKILL_NAME = "Top Deals";
var APP_ID = undefined;

function finder(data) {
    dealer("top");
    fs.readFile('mydeals.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = JSON.parse(data);
        data = data;
        data = data['deal'][0]['deal'];
        // answer = data;
        // return data;
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

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
}

var handlers = {
    'LaunchRequest': function() {
        this.emit('startGameIntent');
    },

    'startIntent': function() {
        var prompt = "Hi, Welcome to Top Deals. Ask me to find top five or top ten deals";
        var reprompt = "Try saying. Alexa, find me the top ten deals";
        this.emit(":ask", prompt, reprompt);
    },

    'topDealsIntent': function() {
        finder("top");
        var prompt = function () {
            setTimeout(function () {
                var prompt = answer;
                var reprompt = answer;
            }, 1000);
            return prompt + "";
        }
        this.emit(":ask", prompt, "reprompt");
    },

    'AMAZON.HelpIntent': function() {
        var prompt = "Try saying. Alexa, find me the top ten deals on Amazon";
        var reprompt = "Try saying. Alexa, find me the top ten deals on Flipkart";
        this.emit(":ask", prompt, reprompt);
    },

    'AMAZON.StopIntent': function() {
        this.emit(':tell', "I wish you and your family a very happy new year, GoodBye!");
        
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "Okay, cancelling your request");

    }

}