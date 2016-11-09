module.exports = {
  label: 'GrantBot Intro',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('Hello! I\'m Grant. I can help answer your questions about applying for grants on Business Grants Portal.')
    ];
  }
};