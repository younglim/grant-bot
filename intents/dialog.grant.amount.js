module.exports = {
  label: 'Grant Amount',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('Different grants have different support levels, depending on what you\'re implementing or upgrading.')
    ];
  }
};