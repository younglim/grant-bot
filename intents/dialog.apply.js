module.exports = {
  label: 'Apply for grant',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('To apply for a grant, you need a CorpPass account. Does your company have a CorpPass administrator?')
    ];
  }
};