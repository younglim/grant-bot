module.exports = {
  label: 'joseph',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        console.log('|----------------------session-----------------------|');
        console.log(session);
        console.log('|---------------------/session-----------------------|');
        console.log('|------------------------args------------------------|');
        console.log(args);
        console.log('|-----------------------/args------------------------|');
        next();
      },
      builder.DialogAction.send('Label:joseph')
    ];
  }
};