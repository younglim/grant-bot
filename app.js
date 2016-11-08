const fs = require('fs');
const path = require('path');
const restify = require('restify');
const builder = require('botbuilder');
const server = restify.createServer();

/**
 * START BOOTSTRAP
 */
let applicationPassword = null;

const config = {
  environment: (process.env.NODE_ENV || 'development'),
  botCredentials: {},
  luisCredentials: {}
};
config.botCredentials.appId = process.env.MICROSOFT_APP_ID;
config.botCredentials.appPassword = process.env.MICROSOFT_APP_PASSWORD;
config.luisCredentials.id = process.env.MICROSOFT_LUIS_ID;
config.luisCredentials.key = process.env.MICROSOFT_LUIS_KEY;

// "https://api.projectoxford.ai/luis/v1/application?id=${config.luisCredentials.id}&subscription-key=${config.luisCredentials.key}"

/**
 * START CONTROLLER
 */
const connector = (config.environment === 'development') ?
  new builder.ConsoleConnector().listen() :
  new builder.ChatConnector(config.botCredentials);
const bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {
    session.send("Hello Worasdasdasdsald!");
});
if(config.environment === 'production') {
  server.post('/api/messages', connector.listen());
  server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
  });
}
/**
 * ENDOF CONTROLLER
 */