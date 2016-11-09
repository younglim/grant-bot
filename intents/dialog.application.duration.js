function getFlow(builder) {
  return [
    (session, args, next) => {
      session.send('It should take you about 20 minutes to complete a grant application, if you have the right documents.');
      next();
    },
    (session) => {
      session.endDialog();
    }
  ];
};

module.exports = {
  label: 'Application duration',
  callbackProvider: (builder, bot) => {
    bot.dialog('/application-duration', getFlow(builder));
    return getFlow(builder);
  }
};