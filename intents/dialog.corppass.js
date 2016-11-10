function getFlow(builder) {
  return [
    function(session, args, next) {
      session.send('CorpPass or Singapore Corporate Access is a secure way for your business to transact online with the goverment. To apply for a grant, you need a CorpPass account.');
      builder.Prompts.confirm(session, 'Does your company have a CorpPass administrator?');
    },
    function(session, result, next) {
      if (result.response) {
          session.send('Get your CorpPass account for you and assign an administrator to create an appropriate Business Grants Portal e-Service role. Then, simply log in to Business Grants Portal with your CorpPass account.');
      } else {
        session.send("Find out how to appoint a CorpPass administrator for your company here: https://www.corppass.gov.sg/cpauth/login/homepage?TAM_OP=login");
      }
      next();
    },
    function(session) {
      session.endDialog();
    }
  ];
}

module.exports = {
  label: 'CorpPass Intro',
  callbackProvider: (builder, bot) => {
    bot.dialog('/corp-pass', getFlow(builder));
    return getFlow(builder);
  }
};
