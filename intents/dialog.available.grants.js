module.exports = {
  label: 'Available grants',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('There are 2 grants now – International Enterprise Singapore\’s Market Readiness Assistance grant and Building and Construction Authority\’s Building Information Model Fund.')
    ];
  }
};