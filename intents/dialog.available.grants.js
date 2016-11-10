function getFlow(builder) {
  return [
    function (session, args, next) {
      session.send('These are the 2 grants:');
      var msg = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments([
          new builder.HeroCard(session)
            .title("Market Readiness Assistance (MRA) Grant")
            .subtitle("Taking your first steps overseas? Let us partner you in achieving your global vision.")
            .images([
              builder.CardImage.create(session, "http://www.iesingapore.gov.sg/~/media/IE%20Singapore/Images/Assistance%20for%20Local%20Companies/MRA/MRA%20Banner/MRA_page_1200x320px.jpg")
                .tap(builder.CardAction.showImage(session, "http://www.iesingapore.gov.sg/~/media/IE%20Singapore/Images/Assistance%20for%20Local%20Companies/MRA/MRA%20Banner/MRA_page_1200x320px.jpg")),
            ])
            .buttons([
              builder.CardAction.openUrl(session, "http://www.iesingapore.gov.sg/Assistance/Market-Readiness-Assistance/Financial-Assistance/Market-Readiness-Assistance-Grant", "Go to MRA Page"),
              builder.CardAction.imBack(session, "select:100", "Tell me more")
            ]),
          new builder.HeroCard(session)
            .title("Building Information Model (BIM) Fund")
            .subtitle("Apply for up to S$30,000 funding to build up your company's BIM collaboration capability to improve productivity in managing building projects.")
            .images([
              builder.CardImage.create(session, "https://www.bca.gov.sg/BIM/images/bim1_mini.png")
                .tap(builder.CardAction.showImage(session, "https://www.bca.gov.sg/BIM/images/bim1_mini.png"))
            ])
            .buttons([
              builder.CardAction.openUrl(session, "https://www.smeportal.sg/content/smeportal/en/moneymatters/grants/building-information-model-bim.html", "Go to BIM Page"),
              builder.CardAction.imBack(session, "select:101", "Tell me more")
            ])
        ]);
      builder.Prompts.choice(session, msg, "select:100|select:101");
    },
    function (session, results, next) {
      var action, item, content;
      var kvPair = results.response.entity.split(':');
      switch (kvPair[0]) {
        case 'select':
          action = 'selected';
          break;
      }
      switch (kvPair[1]) {
        case '100':
          item = "Market Readiness Assistance (MRA) Grant";
          content = "The Market Readiness Assistance Grant helps companies expand their business overseas.";
          break;
        case '101':
          item = "Building Information Model (BIM) Fund";
          content = "The Building Information Model Fund helps companies adopt BIM technology, to improve collaboration between design and construction.";
          break;
      }
      session.send(content);
      next();
    },
    function (session, results) {
      builder.Prompts.confirm(session, "Would you like to know how you can apply for this grant?");
    },
    function (session, results, next) {
      results.response ?
        session.replaceDialog('/corp-pass')
        :
        session.send("What else can I help you with today?");
        next();
    },
    function(session) {
      session.endDialog();
    }
  ];
}

module.exports = {
  label: 'Available grants',
  callbackProvider: (builder, bot) => {
    bot.dialog('/available-grants', getFlow(builder));
    return getFlow(builder);
  }
};
