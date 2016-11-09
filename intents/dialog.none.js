module.exports = {
  label: 'None',
  callbackProvider: (builder) => {
    return [
      function (session) {
        builder.Prompts.choice(session, "Choose an option:", 'Flip A Coin|Roll Dice|Magic 8-Ball|Quit');
      },
      function (session, results) {
        switch (results.response.index) {
          case 0:
            session.beginDialog('/flipCoin');
            break;
          case 1:
            session.beginDialog('/rollDice');
            break;
          case 2:
            session.beginDialog('/magicBall');
            break;
          default:
            session.endDialog();
            break;
        }
      },
      builder.DialogAction.send('I\'m just a bot. I don\'t know everything!')
    ];
  }
};
