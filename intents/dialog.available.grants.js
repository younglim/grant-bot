function getFlow(builder) {
  return [
    function(session, args, next) {
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
              builder.CardAction.openUrl(session, "http://www.iesingapore.gov.sg/Assistance/Market-Readiness-Assistance/Financial-Assistance/Market-Readiness-Assistance-Grant"),
              builder.CardAction.imBack(session, "select:100", "Select")
            ]),
          new builder.HeroCard(session)
            .title("Building Information Grant (BIM) Fund")
            .subtitle("Apply for up to S$30,000 funding to build up your company's BIM collaboration capability to improve productivity in managing building projects.")
            .images([
              builder.CardImage.create(session, "https://www.bca.gov.sg/BIM/images/bim1_mini.png")
                .tap(builder.CardAction.showImage(session, "https://www.bca.gov.sg/BIM/images/bim1_mini.png"))
            ])
            .buttons([
              builder.CardAction.openUrl(session, "https://www.smeportal.sg/content/smeportal/en/moneymatters/grants/building-information-model-bim.html"),
              builder.CardAction.imBack(session, "select:101", "Select")
            ])
        ]);
      builder.Prompts.choice(session, msg, "select:100|select:101");
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
