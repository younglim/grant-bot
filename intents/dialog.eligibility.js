const CHOICE_MAP = {
  'IES MRA':        'ies-mra',
  'BCA BIM':        'bca-bim',
  'I don\'t know':  null
};

const CONTENT_MAP = {
  'ies-mra': {
    image: 'http://www.iesingapore.gov.sg/images/main-logo.jpg',
    title: 'International Enterprise Singapore\'s Market Readiness Assistance',
    subtitle: 'Get up to 70% of eligible third-party costs supported under the Market Readiness Assistance (MRA) grant. These costs cover activities such as: Overseas market set-up, Identification of business partners, Overseas market promotion',
    url: 'http://www.iesingapore.gov.sg/Assistance/Market-Readiness-Assistance/Financial-Assistance/Market-Readiness-Assistance-Grant',
    urlLabel: 'IES-MRA',
    eligibilityText: 'The MRA by IES grant is availabe to SMEs that fulfill the following criteria:\n\n'
+ '- Global HQ anchored in Singapore\n'
+ '- Company annual turnover of less than S$100 million per annum based on the most recent audited report\n'
  },
  'bca-bim': {
    image: 'http://www.bimjunction.com/blog/news_image/32986A-Building-information-model1.png',
    title: 'Building & Construction Authorities Building Information Model Fund',
    subtitle: 'Building Information Modelling (BIM) is identified as a key technology to improve productivity and level of integration across various disciplines across the entire construction value chain',
    url: 'https://www.smeportal.sg/content/smeportal/en/moneymatters/grants/building-information-model-bim.html',
    urlLabel: 'BCA_BIM',
    eligibilityText: 'The BIM by BCA is available to:\n\n'
+ '- Any firm registered with the Accounting and Corporate Regulatory Authority Singapore (ACRA), the Professional Engineers Board Singapore (PEB), or the Board of Architects (BOA) or BCA.\n'
+ '- Is a member of an on-going or upcoming local construction project to be used for the BIM collaboration.\n'
  }
};

function getFlowStart(builder) {
  return [
    (session, args, next) => {
      session.sendTyping();
      setTimeout(function() { next(); }, 1000);
    },
    (session, args, next) => {
      session.send('Each grant has slightly different eligibility criteria but most would require your business to be registered in Singapore with a minimum percentage of local shareholders.');
      session.sendTyping();
      setTimeout(function() { next(); }, 1500);
    },
    (session, result, next) => {
      session.replaceDialog('/eligibility-mid');
    }
  ];
}
function getFlowMid(builder) {
  return [
    (session, args) => {
      builder.Prompts.choice(
        session,
        'When you apply for a grant, the first part of the application states the eligibility criteria for that specific grant. Which grant do you want to apply for?',
        CHOICE_MAP
      );
    },
    (session, result, next) => {
      session.dialogData.userAnswer = CHOICE_MAP[result.response.entity];
      next();
    },
    (session, result, next) => {
      if(!session.dialogData.userAnswer) {
        const iesMraData = CONTENT_MAP['ies-mra'];
        const bcaBimData = CONTENT_MAP['bca-bim'];
        var msg = new builder.Message(session)
          .attachmentLayout(builder.AttachmentLayout.carousel)
          .attachments([
            new builder.ThumbnailCard(session)
              .title(iesMraData.title)
              .subtitle(iesMraData.subtitle)
              .images([
                builder.CardImage.create(session, iesMraData.image)
                  .tap(builder.CardAction.showImage(session, iesMraData.image)),
              ])
              .buttons([
                builder.CardAction.openUrl(session, iesMraData.url, iesMraData.urlLabel),
                builder.CardAction.imBack(session, "ies-mra", "Select")
              ]),
              new builder.ThumbnailCard(session)
                .title(bcaBimData.title)
                .subtitle(bcaBimData.subtitle)
                .images([
                  builder.CardImage.create(session, bcaBimData.image)
                    .tap(builder.CardAction.showImage(session, bcaBimData.image)),
                ])
                .buttons([
                  builder.CardAction.openUrl(session, bcaBimData.url, bcaBimData.urlLabel),
                  builder.CardAction.imBack(session, "bca-bim", "Select")
                ]),
          ]);
        builder.Prompts.choice(session, msg, "ies-mra|bca-bim");
      } else {
        next();
      }
    },
    (session, result, next) => {
      const iesMraData = CONTENT_MAP['ies-mra'];
      const bcaBimData = CONTENT_MAP['bca-bim'];
      const responses = {
        'ies-mra': {
          text: iesMraData.eligibilityText + '\nWould you like me to apply for the International Expansion Singapore (IES) Market Readiness Assistance (MRA) grant for you?'
        },
        'bca-bim': {
          text: bcaBimData.eligibilityText + '\nWould you like me to apply for the Building & Construction Authority (BCA) Building Information Model (BIM) grant for you?'
        }
      };
      session.dialogData.userAnswer = session.dialogData.userAnswer || result.response.entity;
      const ourResponse = responses[session.dialogData.userAnswer];
      session.dialogData.responseText = ourResponse.text;
      next();
    },
    (session, result, next) => {
      builder.Prompts.confirm(session, session.dialogData.responseText);
    },
    (session, result, next) => {
      const userSaidYes = result.response;
      if(userSaidYes) {
        session.replaceDialog('/apply');
      } else {
        next();
      }
    },
    (session, result) => {
      builder.Prompts.confirm(session, 'Would you like find out about the eligibility conditions for another grant?');
    },
    (session, result) => {
      const userSaidYes = result.response;
      if(userSaidYes) {
        session.replaceDialog('/eligibility-mid');
      } else {
        session.send('Okay then, what else would you like to ask?');
        session.endDialog();
      }
    }
  ];
};

module.exports = {
  label: 'Eligibility',
  callbackProvider: (builder, bot) => {
    bot.dialog('/eligibility', getFlowStart(builder));
    bot.dialog('/eligibility-mid', getFlowMid(builder))
    return getFlowStart(builder);
  }
};
