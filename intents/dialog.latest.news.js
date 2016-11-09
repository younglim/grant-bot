module.exports = {
  label: 'Latest News',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      function(session, args, next) {
        superagent.get('https://businessgrants.gov.sg/api/v1/news')
          .end((err, res) => {
            var card = new builder.HeroCard(session)
                .title(`${res.body.news[0].title}`)
                .text(`${res.body.news[0].content}`);
            var msg = new builder.Message(session).attachments([card]);
            session.send(msg);
          });
      }
    ];
  }
};
