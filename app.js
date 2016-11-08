const fs = require('fs');
const path = require('path');
const restify = require('restify');
const builder = require('botbuilder');
const crypt = require('./crypt');
const ConfigGuardian = require('config-guardian');
const config = ConfigGuardian({ ignore: ['node_modules'], refresh: true });
const server = restify.createServer();
let applicationPassword = null;
try {
  applicationPassword = fs.readFileSync(path.join(__dirname, '/PASSWORD')).toString();
} catch(ex) {
  switch(ex.code) {
    case 'ENOENT':
      console.info('Create a file named `PASSWORD` in the project root and enter password as it\'s content.');
      process.exit();
    break;
    default:
      throw ex;
  }
}
config.botCredentials.appPassword = crypt.decrypt(config.botCredentials.appPassword, applicationPassword);
config.botCredentials.appId = crypt.decrypt(config.botCredentials.appId, applicationPassword);
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