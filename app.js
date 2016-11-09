var fs = require('fs');
var path = require('path');
var superagent = require('superagent');
var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();
var oxford = require('project-oxford');

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
dialog.begin = function(session, reply) {
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
const pathToIntents = path.join(__dirname, '/intents');
const intentListing = fs.readdirSync(pathToIntents);
intentListing.forEach(intent => {
  const currentIntent = require(path.join(pathToIntents, `/${intent}`));
  dialog.matches(currentIntent.label, currentIntent.callbackProvider(builder));
});
dialog.matches('Latest News', [
  function(session, args, next) {
    superagent.get('https://businessgrants.gov.sg/api/v1/news')
      .end((err, res) => {
        var card = new builder.HeroCard(session)
            .title(`${res.body.news[0].title}`)
            .text(`${res.body.news[0].content}`);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
      });
  }
]);// builder.DialogAction.send('We\'ve just launched the Building Information Model Fund from Building and Construction Authority (BCA).'));
//
dialog.matches('Log-in Help', builder.DialogAction.send('Just click on the log-in button and log in with your CorpPass account. If you don\'t have a CorpPass account,speak to your CorpPass administrator.'));
dialog.matches('Eligibility', builder.DialogAction.send('Each grant has slightly different eligibility criteria but most would require your business to be registered in Singapore with a minimum percentage of local shareholders. When you apply for a grant, the first part of the application states the eligibility criteria for that specific grant. Which grant are you applying for?'));
dialog.matches('Apply for same grant', builder.DialogAction.send('Yes you can apply for the same grant more than once, as long as it\'s not for the same project.'));
dialog.matches('CorpPass Intro', builder.DialogAction.send('CorpPass or Singapore Corporate Access is a secure way for your business to transact online with the goverment. To apply for a grant, you need a CorpPass account. Does your company have a CorpPass administrator?'));
dialog.onDefault(builder.DialogAction.send("It went through"));
dialog.matches('Upload', function (session, results) {
  session.beginDialog('/uploadImage');
});

var visionClient = new oxford.Client(config.visionApiCredentials.key);

bot.dialog('/uploadImage', [
  (session) => {
    builder.Prompts.attachment(session, "Upload an image and I'll send it back to you.");
  },
  (session, results) => {
    var msg = new builder.Message(session)
        .ntext("I got %d attachment.", "I got %d attachments.", results.response.length);

    results.response.forEach(function (attachment) {
        msg.addAttachment(attachment);
        visionClient.vision.ocr({
          url: attachment.contentUrl,
          language: 'en'
        }).then(function (response) {
          session.send(response.body);
          console.log(response.body);
        }); 
    });
    session.endDialog(msg);
  }
]);
if(config.environment === 'production') {
  server.post('/api/messages', connector.listen());
  server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
  });
}
/**
 * ENDOF CONTROLLER
 */
