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
    telegramDebug.logJson(results);
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
  bot.dialog('/notify', [
    function(session, args, next) {
      telegramDebug.notify('it\'s reaching!');
      session.send('hello');
      next();
    },
    function(session) {
      session.endDialog();
    }
  ])
  server.get('/users', function(req, res, next) {
    const User = require('./users');
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(User.getUsers()),
      'Content-Type': 'text/html'
    });
    res.write(User.getUsers());
  });
  server.get('/user/:id', function(req, res, next) {
    const User = require('./users');
    const savedAddress = User.getId(req.params.id);
    var msg = new builder.Message()
      .text('Hi Mr. Tan, your grant application with ID \'SA7661L70XC\' (Market Readiness Assistance by Internal Expansion Singapore) is missing a receipt.')
      .address(savedAddress);
    bot.send(msg);
    bot.beginDialog('/notify');
    res.send('done');
  });
  server.use(restify.bodyParser({ mapParams: true }));
  server.post('/api/messages', [function(req, res, next) {
    //telegramDebug.logJson(req.body.channelId);
    //telegramDebug.logJson(req.body.channelData.message.chat);
    var exampleData = {
      "channelData": {
        "message": {
          "chat": {
            "first_name": "Joseph Matthias",
            "id": 267230627,
            "last_name": "Goh",
            "type": "private",
            "username": "zephinzer"
          },
          "date": 1478760927,
          "from": {
            "first_name": "Joseph Matthias",
            "id": 267230627,
            "last_name": "Goh",
            "username": "zephinzer"
          },
          "message_id": 2738,
          "text": "am i eligible?"
        },
        "update_id": 619114743
      },
      "channelId": "telegram",
      "conversation": {
        "id": "267230627",
        "isGroup": false
      },
      "from": {
        "id": "267230627",
        "name": "zephinzer"
      },
      "id": "8TThQHqc76I",
      "recipient": {
        "id": "bizgrants_bot",
        "name": "grant_bot"
      },
      "serviceUrl": "https://telegram.botframework.com/",
      "text": "am i eligible?",
      "timestamp": "2016-11-10T06:55:27.0703571+00:00",
      "type": "message"
    };
    next();
  }, connector.listen()]);
  server.listen(process.env.port || process.env.PORT || 3978, function () {
    telegramDebug.notify('Bot started in production mode!');
    console.log('%s listening to %s', server.name, server.url);
  });
}
/**
 * ENDOF CONTROLLER
 */
