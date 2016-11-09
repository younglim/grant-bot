module.exports = {
  label: 'Application duration',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('It should take you about 20 minutes to complete a grant application, if you have the right documents.')
    ];
  }
};