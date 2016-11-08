const fs = require('fs');
const path = require('path');
const restify = require('restify');
const builder = require('botbuilder');
const ConfigGuardian = require('config-guardian');
const config = ConfigGuardian({ ignore: ['node_modules'], refresh: true });
const server = restify.createServer();

config.botCredentials.appId = process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : crypt.decrypt(config.botCredentials.appId, applicationPassword);
config.botCredentials.appPassword = process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : crypt.decrypt(config.botCredentials.appPassword, applicationPassword);
const connector = (config.environment === 'development') ?
  new builder.ConsoleConnector().listen() :
  new builder.ChatConnector(config.botCredentials);
const bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {
    session.send("Hello Worasdasdasdsald! :D");
});
if(config.environment === 'production') {
  server.post('/api/messages', connector.listen());
  server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
  });
}