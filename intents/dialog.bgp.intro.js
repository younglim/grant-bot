module.exports = {
  label: 'BGP Intro',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('Business Grants Portal brings government grants for businesses into one place, so it\'s easier to find and apply for the grants you need. The grant support you receive will depend on your situation.')
    ];
  }
};