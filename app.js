const restify = require('restify');
const builder = require('botbuilder');
const ConfigGuardian = require('config-guardian');
const config = ConfigGuardian({ ignore: ['node_modules'], refresh: true });

const server = restify.createServer();
console.log(config);
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