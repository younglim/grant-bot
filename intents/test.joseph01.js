const telegramDebug = require('../telegram-debug');

module.exports = {
  label: 'Test Joseph',
  callbackProvider: (builder) => {
    return [
      function(session, args) {
        const User = require('../users');
        User.pushUser(session.message.address);
        session.send('Registered user ' + JSON.stringify(session.message.address));
      }
    ];
  }
};
