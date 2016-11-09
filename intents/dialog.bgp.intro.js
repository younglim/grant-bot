module.exports = {
  label: 'BGP Intro',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        session.send('Business Grants Portal brings government grants for businesses into one place, so it\'s easier to find and apply for the grants you need. The grant support you receive will depend on your situation.');
        next();
      },
      function(session, args, next) {
        builder.Prompts.choice(session,'Would you like to know how to apply for a grant?', 'Yes|No');
      },
      function(session, result, next) {
        switch(result.response.entity) {
          case 'Yes':
            session.send('To apply for a grant, you need a CorpPass account. Does your company have a CorpPass administrator?');
            break;
          case 'No':
            session.send('What else can I help with today?');
            break;
        }
        next();
      }
    ];
  }
};

// What is business grants portal?
