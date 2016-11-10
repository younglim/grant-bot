var fs = require('fs');
var path = require('path');
var superagent = require('superagent');
var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();
var oxford = require('project-oxford');
var telegramDebug = require('./telegram-debug');
var jsonPrettify = require('json-pretty');
var telegramDebug = require('./telegram-debug');

/**
 * START BOOTSTRAP
 */
var applicationPassword = null;

var config = {
  environment: (process.env.NODE_ENV || 'development'),
  botCredentials: {},
  luisCredentials: {},
  visionApiCredentials: {}
};
config.botCredentials.appId = process.env.MICROSOFT_APP_ID;
config.botCredentials.appPassword = process.env.MICROSOFT_APP_PASSWORD;
config.luisCredentials.id = process.env.MICROSOFT_LUIS_ID;
config.luisCredentials.key = process.env.MICROSOFT_LUIS_KEY;
config.visionApiCredentials.key = process.env.MICROSOFT_VISIONAPI_KEY;

var model = `https://api.projectoxford.ai/luis/v1/application?id=${config.luisCredentials.id}&subscription-key=${config.luisCredentials.key}`;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [
  recognizer
] });

/**
 * START CONTROLLER
 */
var connector = (config.environment === 'development') ?
  new builder.ConsoleConnector().listen() :
  new builder.ChatConnector(config.botCredentials);
var bot = new builder.UniversalBot(connector);

bot.dialog('/', dialog);
const pathToIntents = path.join(__dirname, '/intents');
const intentListing = fs.readdirSync(pathToIntents);
intentListing.forEach(intent => {
  const currentIntent = require(path.join(pathToIntents, `/${intent}`));
  console.info(`Registered intent ${currentIntent.label}`);
  dialog.matches(currentIntent.label, currentIntent.callbackProvider(builder, bot));
});
// builder.DialogAction.send('We\'ve just launched the Building Information Model Fund from Building and Construction Authority (BCA).'));
//
dialog.onDefault([
  function(session, args, next) {
    console.log('|----------------------session-----------------------|');
    console.log(session);
    console.log('|---------------------/session-----------------------|');
    console.log('|------------------------args------------------------|');
    console.log(args);
    console.log('|-----------------------/args------------------------|');
  },
  builder.DialogAction.send("It went through")
]);
dialog.matches('Upload', function (session, results) {
  session.beginDialog('/uploadImage');
});

var visionClient = new oxford.Client(config.visionApiCredentials.key);

bot.dialog('/uploadImage', [
  (session) => {
    builder.Prompts.attachment(session, "Upload the document and I will keep track of the claim.");
  },
  (session, results) => {
  
    results.response.forEach(function (attachment) {
        visionClient.vision.ocr({
          url: attachment.contentUrl,
          language: 'en'
        }).then(function (response) {
          
          if ((typeof response !== 'undefined') && (typeof response.regions !== 'undefined') && (response.regions.length > 0) && (typeof response.regions[0].lines !== 'undefined')) {

            var ocrText = '';

            response.regions.forEach(data => {
              data.lines.forEach(line => {
                ocrText +="\n";
                line.words.forEach(word => {
                  ocrText += word.text +" ";
                });
              });
            });

            var currencyAmount = ocrText.match(/([a-zA-Z]{2,10}|\$)*(\s){0,3}((\d|O|o)+(\.|\,)\s*){1,5}(\d|O|o){2}/g);
            var others = ocrText;

            if (currencyAmount !== null) {
              telegramDebug.notify(ocrText);
              session.endDialog("I have added your invoice of " + currencyAmount[currencyAmount.length - 1].split(/\s+/).pop().replace(/(\O|\o)/g,'0') + " .");
            } else {
              session.send("I couldn't read your document, please send a clearer image.");
            }

          } else {
            session.send("I couldn't read your document. Please send it in JPG or PNG format again.");
          }
         

        }, function(err) {
          console.log(arguments);
          session.endDialog("I'm sorry, an unknown error has occured. Please send your question again.");
        });
    });
    
  }
]);
if(config.environment === 'production') {
  server.use('/api/messages', function(req, res, next) {
    console.log('!!!!!!');
    next();
  });
  server.post('/api/messages', connector.listen());
  server.listen(process.env.port || process.env.PORT || 3978, function () {
    telegramDebug.notify('Bot started in production mode!');
    console.log('%s listening to %s', server.name, server.url);
  });
}
/**
 * ENDOF CONTROLLER
 */
