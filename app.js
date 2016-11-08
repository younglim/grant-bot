var fs = require('fs');
var path = require('path');
var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();

/**
 * START BOOTSTRAP
 */
var applicationPassword = null;

var config = {
  environment: (process.env.NODE_ENV || 'development'),
  botCredentials: {},
  luisCredentials: {}
};
config.botCredentials.appId = process.env.MICROSOFT_APP_ID;
config.botCredentials.appPassword = process.env.MICROSOFT_APP_PASSWORD;
config.luisCredentials.id = process.env.MICROSOFT_LUIS_ID;
config.luisCredentials.key = process.env.MICROSOFT_LUIS_KEY;

var model = `https://api.projectoxford.ai/luis/v1/application?id=${config.luisCredentials.id}&subscription-key=${config.luisCredentials.key}`;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [
  recognizer
] });
dialog.begin = function(session, reply) {
  console.log(arguments);
  this.replyReceived(session);
}

/**
 * START CONTROLLER
 */
var connector = (config.environment === 'development') ?
  new builder.ConsoleConnector().listen() :
  new builder.ChatConnector(config.botCredentials);
var bot = new builder.UniversalBot(connector);

bot.dialog('/', dialog);
dialog.matches('Apply for grant', builder.DialogAction.send('Let\'s Apply for a grant!'));
dialog.onDefault(builder.DialogAction.send("It went through"));

//session.beginDialog('/uploadImage');

bot.dialog('/uploadImage', [
  (session) => {
    builder.Prompts.attachment(session, "Upload an image and I'll send it back to you.");
  },
  (session, results) => {
    var msg = new builder.Message(session)
        .ntext("I got %d attachment.", "I got %d attachments.", results.response.length);
    results.response.forEach(function (attachment) {
        msg.addAttachment(attachment);    
    });
    session.endDialog(msg);
  }
]);
/*bot.mwReceive.push(function(event, next) {
  console.log('receive');
  console.log(arguments);
  next();
});
bot.mwSend.push(function(event, next) {
  console.log('send');
  console.log(arguments);
  next();
});
bot.mwSession.push(function(event, next) {
  console.log('session');
  console.log(arguments);
  next();
});*/
if(config.environment === 'production') {
  server.post('/api/messages', connector.listen());
  server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
  });
}
/**
 * ENDOF CONTROLLER
 */