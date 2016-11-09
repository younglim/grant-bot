module.exports = {
  label: 'Log-in Help',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send("Just click on the log-in button and log in with your CorpPass account. If you don\'t have a CorpPass account,speak to your CorpPass administrator.")
    ];
  }
};
