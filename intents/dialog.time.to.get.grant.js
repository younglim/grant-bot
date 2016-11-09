function getFlow(builder) {
  return [
    function(session, args, next) {
      session.sendTyping();
      setTimeout(function() {
        session.send('After you submit your application, the agency giving out the grant will need 2-4 weeks to process it...');
        session.sendTyping();
      }, 1000);
      setTimeout(function() {
        session.send('If your grant is approved, you can submit your claim to get your grant money!');
        session.endDialog();
      }, 3000);
    },
  ];
}

module.exports = {
  label: 'Time to get grant',
  callbackProvider: (builder, bot) => {
    bot.dialog('/time-to-get-grant', getFlow(builder));
    return getFlow(builder);
  }
};