function getFlow(builder) {
  return [
    function(session, args, next) {
      session.sendTyping();
      setTimeout(function() { next(); }, 1500);
    },
    function(session, args, next) {
      session.send('Each grant has slightly different eligibility criteria but most would require your business to be registered in Singapore with a minimum percentage of local shareholders.');
      session.sendTyping();
      setTimeout(function() { next(); }, 1500);
    },
    function(session, args, next) {
      builder.Prompts.choice(
        session,
        'When you apply for a grant, the first part of the application states the eligibility criteria for that specific grant. Which grant do you want to apply for?',
        'IE-MRA|BCA-BIM|I don\'t know'
      );
    },
    function(session, result, next) {
      var msg = new builder.Message(session)
          .attachmentLayout(builder.AttachmentLayout.carousel)
          .attachments([
              new builder.ThumbnailCard(session)
                .title("International Enterprise Singapore\'s Market Readiness Assistance")
                .subtitle("International Enterprise Singapore\'s Market Readiness Assistance")
                .images([
                    builder.CardImage.create(session, "http://www.iesingapore.gov.sg/images/main-logo.jpg")
                        .tap(builder.CardAction.showImage(session, "http://www.iesingapore.gov.sg/images/main-logo.jpg")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://www.iesingapore.gov.sg/Assistance/Market-Readiness-Assistance/Financial-Assistance/Market-Readiness-Assistance-Grant", "Wikipedia"),
                    builder.CardAction.imBack(session, "select:100", "Select")
                ]),
              new builder.ThumbnailCard(session)
                .title("Building & Construction Authorities Building Information Model Fund")
                .subtitle("Building & Construction Authorities Building Information Model Fund")
                .images([
                    builder.CardImage.create(session, "http://www.bimjunction.com/blog/news_image/32986A-Building-information-model1.png")
                      .tap(builder.CardAction.showImage(session, "http://www.bimjunction.com/blog/news_image/32986A-Building-information-model1.png")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "https://www.smeportal.sg/content/smeportal/en/moneymatters/grants/building-information-model-bim.html", "Wikipedia"),
                    builder.CardAction.imBack(session, "select:101", "Select")
                ]),
          ]);
      builder.Prompts.choice(session, msg, "select:100|select:101");
      /**
      if(result.response.index === 2) {
        session.Prompts.choice(
          session,
          'There are 2 grants on Business Grants Portal now – International Enterprise Singapore’s Market Readiness Assistance grant and Building and Construction Authority’s Building Information Model Fund.',
          'International Enterprise Singapore\'s Market Readiness Assistance|Building & Construction Authorities Building Information Model Fund'
        );
      } else {
        session.dialogData.grant = result.response.index;
        next();
      }
      **/
    },
    (session, result) => {
      console.log(session);
      console.log(result);
    },
    /*
    function(session, result) {
      if(!session.dialogData.grant) {
        session.dialogData.grant = result.response.index;
      }
      switch(session.dialogData.grant) {
        case 0:
          session.Prompts.confirm(
            session,
            'SMEs that fulfill the following criteria:\n - Global HQ anchored in Singapore\n - Company annual turnover of less than S$100 million per annum based on the most recent audited report.\n\nApply for this grant?'
          );
        break;
        case 1:
          session.Prompts.confirm(
            session,
            '\n - Any firm registered with the Accounting and Corporate Regulatory Authority Singapore (ACRA), the Professional Engineers Board Singapore (PEB), or the Board of Architects (BOA) or BCA.'
            + '\n- Is a member of an on-going or upcoming local construction project to be used for the BIM collaboration.\n\n' +
            'Apply for this grant?'
          );
        break;
      }
    }*/
  ];
};

module.exports = {
  label: 'Eligibility',
  callbackProvider: (builder, bot) => {
    bot.dialog('/eligibility', getFlow(builder));
    return getFlow(builder);
  }
};
