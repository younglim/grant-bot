function getFlow(builder) {
  return [
    (session, args, next) => {
      session.sendTyping();
      builder.Prompts.confirm(session, 'To apply for a grant, you need a CorpPass account. Does your company have a CorpPass administrator?');
    },
    (session, result, next) => {
      const userSaidYes = result.response;
      if(userSaidYes) {
        session.send('Get your CorpPass administrator to create an account for you and assign an appropriate Business Grants Portal e-Service role. Then, simply log in to Business Grants Portal with your CorpPass account.');
        session.sendTyping();
      } else {
        session.send('Find out how to appoint a CorpPass administrator for your company here: https:// www.corppass.gov.sg/cpauth/login/homepage?TAM_OP=login');
        session.sendTyping();
      }
      setTimeout(next, 1000);
    },
    (session) => {
      builder.Prompts.confirm(session, 
        'I\'ll be happy to help more when you\'ve logged in.\n\n\Is there anything else I can help you with today?'
      );
    },
    (session, result, next) => {
      const userSaidYes = result.response;
      if(userSaidYes) {
        session.send('Ask away!');
        session.endDialog();
      } else {
        session.send('Thank you for stopping by. Drop by anytime if you need more help.');
        session.endConversation();
      }
    }
  ];
};

module.exports = {
  label: 'Apply for grant',
  callbackProvider: (builder, bot) => {
    bot.dialog('/apply', getFlow(builder));
    return getFlow(builder);
  }
};