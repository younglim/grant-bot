module.exports = {
  label: 'Apply for same grant',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('Yes you can apply for the same grant more than once, as long as it\'s not for the same project.')
    ];
  }
};
