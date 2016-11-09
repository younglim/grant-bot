module.exports = {
  label: 'Time to get grant',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('After you submit your application, the agency giving out the grant will need 2-4 weeks to process it. If your grant is approved, you can submit your claim to get your grant money.')
    ];
  }
};