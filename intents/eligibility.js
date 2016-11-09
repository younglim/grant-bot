module.exports = {
  label: 'Eligibility',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        next();
      },
      builder.DialogAction.send('Each grant has slightly different eligibility criteria but most would require your business to be registered in Singapore with a minimum percentage of local shareholders. When you apply for a grant, the first part of the application states the eligibility criteria for that specific grant. Which grant are you applying for?')
    ];
  }
};
