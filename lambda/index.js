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

    'startGameIntent': function() {
        var prompt = "";
        var reprompt = "";
        this.emit(":ask", prompt, reprompt);
    },

    'userAnswerIntent': function() {
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
        this.emit(':tell', "Thanks for playing, GoodBye!");
        
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "Thanks for playing, GoodBye!");

    }

}