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

            //Search it to make sure the syllable count is the same
            if (info) {
                for (var i = 0; i < info.length; i++) {
                    deals.push(info[i].deal);
                }
                if (_callback) {
                    var randIndex = Math.floor(Math.random() * (deals.length - 1));
                    if (deals[randIndex]) {
                        return _callback(deals[randIndex]);
                    }
                }
            }
        } else {
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
        this.emit('startGameIntent');
    },

    'startIntent': function() {
        var prompt = "Hi, Welcome to Top Deals. Ask me to find top five or top ten deals";
        var reprompt = "Try saying. Alexa, find me the top ten deals";
        this.emit(":ask", prompt, reprompt);
    },

    'topDealsIntent': function () {
        // if (wordInput == null || wordInput === "undefined" || wordInput == '') { //Alexa doesnt understand the word, so User loses.
        //     this.emit('Unhandled'); //send to unhandled handler
        // }
        // else {
            dealer("top", (speechOutput) => {
                if (speechOutput == '') {
                    this.emit('Unhandled');
                }
                else {
                    this.emit(':tell', speechOutput);
                    this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), speechOutput);
                    //this.emit(':ask', speechOutput);
                }
            });
        // }
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

    },

    'Unhandled': function () {
        console.log("UNHANDLED");
        //If the users sentence really made no sense at all, then just choose a random word to finish with.
        dealer("top", (speechOutput) => {
            if (speechOutput == '') {
                this.emit('Unhandled');
            } else {
                this.emit(':tell', "YO YO");
            }
        });
    }
}