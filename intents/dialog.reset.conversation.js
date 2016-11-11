const telegramDebug = require('../telegram-debug');

module.exports = {
  label: 'Reset Conversation',
  callbackProvider: (builder) => {
    return [
      function (session, args, next) {
        telegramDebug.notify('Conversation ended for user: ' + JSON.stringify(session.message.address));
        session.endDialog();
        session.endConversation();
      }
    ];
  }
};
