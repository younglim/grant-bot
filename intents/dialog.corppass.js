module.exports = {
  label: 'CorpPass Intro',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        session.send('1');
        next();
      },
      builder.DialogAction.send('CorpPass or Singapore Corporate Access is a secure way for your business to transact online with the goverment. To apply for a grant, you need a CorpPass account. Does your company have a CorpPass administrator?')
    ];
  }
};
