function getFlow(builder) {
  return [
    function(session, args, next) {
      session.send('Different grants have different support levels, depending on what you\'re implementing or upgrading.');
      session.endDialog();
    },
  ];
};

module.exports = {
  label: 'Grant Amount',
  callbackProvider: (builder, bot) => {
    bot.dialog('/grant-amount', getFlow(builder));
    return getFlow(builder);
  }
};