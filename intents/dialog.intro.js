module.exports = {
  label: 'GrantBot Intro',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        console.log('|----------------------session-----------------------|');
        console.log(session);
        console.log('|---------------------/session-----------------------|');
        console.log('|------------------------args------------------------|');
        console.log(args);
        console.log('|-----------------------/args------------------------|');
        console.log(args);
        session.send('1');
        next();
      },
      builder.DialogAction.send('Hello! I\'m Grant. I can help answer your questions about applying for grants on Business Grants Portal.')
    ];
  }
};