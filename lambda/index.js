"use strict";
var Alexa = require("alexa-sdk");
var request = require('request');
var SKILL_NAME = "Top Deals";
var APP_ID = undefined;

function dealer(contextWord, _callback) {
    var options = {
        url: 'https://top-deals-api.herokuapp.com/' + contextWord
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            //Get the info
            var info = JSON.parse(body);
            info = info['deal'];
            var deals = [];
            var links = [];
            if (info) {
                for (var i = 0; i < 5; i++) {
                    deals.push(info[i].deal);
                    links.push(info[i].link);
                }
                if (_callback) {
                    var randIndex = Math.floor(Math.random() * (deals.length - 1));
                    if (deals[randIndex]) {
                        return _callback([deals, links]);
                    }
                }
            }
        }
        else {
            console.log("Error making request: " + error);
        }
        if (_callback) {
            return _callback('');
        }
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
        this.emit('startIntent');
    },

    'startIntent': function() {
        var prompt = "Hi, Welcome to Top Deals. I will make your new year shopping easy just ask me to find top five deals from flipkart or top five deals from amazon";
        var reprompt = "Try saying. Alexa, find me the top five deals";
        this.emit(":ask", prompt, reprompt);
    },

    'topDealsIntent': function () {
        dealer("top", (speechOutput) => {
            if (speechOutput == '') {
                this.emit('Unhandled');
            }
            else {
                var cardString = speechOutput[0][0] + "\n" + speechOutput[1][0] + "\n" + "\n" +
                                speechOutput[0][1] + "\n" + speechOutput[1][1] + "\n" + "\n" +
                                speechOutput[0][2] + "\n" + speechOutput[1][2] + "\n" + "\n" +
                                speechOutput[0][3] + "\n" + speechOutput[1][3] + "\n" + "\n" +
                                speechOutput[0][4] + "\n" + speechOutput[1][4] + "\n"
                var speechString = speechOutput[0][0] + ",,,," +
                                    speechOutput[0][1] + ",,,," +
                                    speechOutput[0][2] + ",,,," +
                                    speechOutput[0][3] + ",,,," +
                                    speechOutput[0][4] + ",,,,"
                this.emit(":tellWithCard", speechString, SKILL_NAME, cardString);
            }
        });
    },

    'topAmazonDealsIntent': function () {
        dealer("search/Amazon", (speechOutput) => {
            if (speechOutput == '') {
                this.emit('Unhandled');
            } else {
                var cardString = speechOutput[0][0] + "\n" + speechOutput[1][0] + "\n" + "\n" +
                    speechOutput[0][1] + "\n" + speechOutput[1][1] + "\n" + "\n" +
                    speechOutput[0][2] + "\n" + speechOutput[1][2] + "\n" + "\n" +
                    speechOutput[0][3] + "\n" + speechOutput[1][3] + "\n" + "\n" +
                    speechOutput[0][4] + "\n" + speechOutput[1][4] + "\n"
                var speechString = speechOutput[0][0] + ",,,," +
                    speechOutput[0][1] + ",,,," +
                    speechOutput[0][2] + ",,,," +
                    speechOutput[0][3] + ",,,," +
                    speechOutput[0][4] + ",,,,"
                this.emit(":tellWithCard", speechString, SKILL_NAME, cardString);
            }
        });
    },

    'topFlipkartDealsIntent': function () {
        dealer("search/Flipkart", (speechOutput) => {
            if (speechOutput == '') {
                this.emit('Unhandled');
            } else {
                var cardString = speechOutput[0][0] + "\n" + speechOutput[1][0] + "\n" + "\n" +
                    speechOutput[0][1] + "\n" + speechOutput[1][1] + "\n" + "\n" +
                    speechOutput[0][2] + "\n" + speechOutput[1][2] + "\n" + "\n" +
                    speechOutput[0][3] + "\n" + speechOutput[1][3] + "\n" + "\n" +
                    speechOutput[0][4] + "\n" + speechOutput[1][4] + "\n"
                var speechString = speechOutput[0][0] + ",,,," +
                    speechOutput[0][1] + ",,,," +
                    speechOutput[0][2] + ",,,," +
                    speechOutput[0][3] + ",,,," +
                    speechOutput[0][4] + ",,,,"
                this.emit(":tellWithCard", speechString, SKILL_NAME, cardString);
            }
        });
    },

    'AMAZON.HelpIntent': function() {
        var prompt = "Try saying. Alexa, find me the top five deals on Amazon";
        var reprompt = "Try saying. Alexa, find me the top five deals on Flipkart";
        this.emit(":ask", prompt, reprompt);
    },

    'AMAZON.StopIntent': function() {
        this.emit(':tell', "I wish you and your family a very happy new year, GoodBye!");
        
    },

    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "I wish you and your family a very happy new year, GoodBye!");

    },

    'Unhandled': function () {
        console.log("UNHANDLED");
        dealer("top", (speechOutput) => {
            if (speechOutput == '') {
                this.emit('Unhandled');
            } else {
                this.emit(':tell', "Sorry, I am not able to find deals right now");
            }
        });
    }
}