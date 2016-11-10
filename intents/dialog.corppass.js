function getFlow(builder) {
  return [
    function(session, args, next) {
      session.send('CorpPass or Singapore Corporate Access is a secure way for your business to transact online with the goverment. To apply for a grant, you need a CorpPass account.');
      builder.Prompts.choice(session, 'Does your company have a CorpPass administrator?', 'Yes|No');
    },
    function(session, result, next) {
      console.log(result);
      console.log('process input');
      switch (result.response.index) {
        case 0:
          session.send('yes');
          break;
        case 1:
          session.send('no');
          break;
        default:
          session.endDialog();
          break;
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
