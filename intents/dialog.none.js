module.exports = {
  label: 'None',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        session.send('1');
        next();
      },
      builder.DialogAction.send('I\'m just a bot. I don\'t know everything!')
    ];
  }
};
