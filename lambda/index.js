"use strict";

var Alexa = require("alexa-sdk");
var SKILL_NAME = "Top Deals";
var APP_ID = undefined;

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

    'Intent': function() {
        var prompt = "";
        var reprompt = "";
        this.emit(":ask", prompt, reprompt);
    },

    'AMAZON.HelpIntent': function() {
        var prompt = "";
        var reprompt = "";
        this.emit(":ask", prompt, reprompt);
    },

    'AMAZON.StopIntent': function() {
        this.emit(':tell', "I wish you and your family a very happy new year, GoodBye!");
        
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "Okay, cancelling your request");

    }

}