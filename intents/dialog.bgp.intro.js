function getFlow(builder) {
  return [
    function(session, args, next) {
      session.send('Business Grants Portal brings government grants for businesses into one place, so it\'s easier to find and apply for the grants you need. The grant support you receive will depend on your situation.');
      builder.Prompts.confirm(session, "Would you like to know how to apply for a grant?");
    },
    function(session, result, next) {
      if (result.response) {
        session.send('CorpPass or Singapore Corporate Access is a secure way for your business to transact online with the goverment. To apply for a grant, you need a CorpPass account.');
        session.beginDialog('/corp-pass');
      } else {
        session.send('What else can I help with today?');
      }
      next();
    },
    function(session) {
      session.endDialog();
    }
  ];
}

module.exports = {
  label: 'BGP Intro',
  callbackProvider: (builder, bot) => {
    bot.dialog('/bgp-intro', getFlow(builder));
    return getFlow(builder);
  }
};
