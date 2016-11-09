function getFlow(builder) {
  return [
    function(session, args, next) {
      session.send('There are 2 grants now – International Enterprise Singapore\’s Market Readiness Assistance grant and Building and Construction Authority\’s Building Information Model Fund.');
      next();
    },
    function(session) {
      session.endDialog();
    }
  ];
}

module.exports = {
  label: 'Available grants',
  callbackProvider: (builder, bot) => {
    bot.dialog('/available-grants', getFlow(builder));
    return getFlow(builder);
  }
};
