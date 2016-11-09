module.exports = {
  label: 'Eligibility',
  callbackProvider: (builder) => {
    return [
      function(session, args) {
        session.sendTyping();
        setTimeout(function() {
          session.send('Each grant has slightly different eligibility criteria but most would require your business to be registered in Singapore with a minimum percentage of local shareholders.');
          session.sendTyping();
        }, 1000);
        setTimeout(function() {
          builder.Prompts.choice(
            session,
            'When you apply for a grant, the first part of the application states the eligibility criteria for that specific grant. Which grant do you want to apply for?',
            'International Enterprise Singapore\'s Market Readiness Assistance|Building & Construction Authorities Building Information Model Fund|I don\'t know'
          );
        }, 2000);
      },
      function(session, result, next) {
        var msg = new builder.Message(session)
          .attachments([
              new builder.HeroCard(session)
                  .title("Hero Card")
                  .subtitle("The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.")
                  .images([
                      builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
                  ])
                  .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle")),
              new builder.HeroCard(session)
                  .title("Hero Card 2")
                  .subtitle("The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.")
                  .images([
                      builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
                  ])
                  .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle"))
          ]);
        session.send(msg);
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
  }
};
