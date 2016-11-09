function getFlow(builder) {
  return [
    function(session, args, next) {
      session.sendTyping();
      setTimeout(function() {
        session.send('After you submit your application, the agency giving out the grant will need 2-4 weeks to process it...');
        session.sendTyping();
      }, 1000);
      setTimeout(function() {
        session.send('If your grant is approved, you can submit your claim to get your grant money!');
        var msg = new builder.Message(session)
          .attachments([
            new builder.HeroCard(session)
              .images([
                builder.CardImage.create(session, "https://s-media-cache-ak0.pinimg.com/236x/83/03/e5/8303e5de43d1424c04f18f90bc8f9df9.jpg")
              ])
          ]);
        session.endDialog(msg);
      }, 3000);
    },
  ];
}

module.exports = {
  label: 'Time to get grant',
  callbackProvider: (builder, bot) => {
    bot.dialog('/time-to-get-grant', getFlow(builder));
    return getFlow(builder);
  }
};
