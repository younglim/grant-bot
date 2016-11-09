function getFlow(builder) {
  return [
    function(session, args, next) {
      session.send('Hello! I\'m Grant. I can help answer your questions about applying for grants on Business Grants Portal.');
      next();
    },
    function(session, args, next) {
      builder.Prompts.choice(session, 'Try it now, ask me how many grants there are on Business Grants Portal.', 'How many grants?|No thanks');
    },
    function(session, result, next) {
      switch(result.response.index) {
        case 0: session.beginDialog('/available-grants'); break;
        case 1: session.send('What else can I help you with?');
                next();
      }
    },
    function(session) {
      session.endDialog();
    }
  ];
}

module.exports = {
  label: 'GrantBot Intro',
  callbackProvider: (builder, bot) => {
    bot.dialog('/grant-bot-intro', getFlow(builder));
    return getFlow(builder);
  }
};
