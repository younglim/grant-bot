module.exports = {
  label: 'None',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        session.send("CrunchBot can answer questions about a handfull of tech companies. Here are some of the things you can ask:\n\n" +
        "* 'tell me about Microsoft'\n" +
        "* 'how many companies has apple bought?'\n" +
        "* 'when did amazon go public?'\n" +
        "* 'where is googles headquarters?'\n" +
        "* 'who founded microsoft?'\n" +
        "* 'what is amazons website?'\n" +
        "\nOnce you ask a question about a company you can ask followup questions about the same company.");
        next();
      },
      builder.DialogAction.send('I\'m just a bot. I don\'t know everything!')
    ];
  }
};
