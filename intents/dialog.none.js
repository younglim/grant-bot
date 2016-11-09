const possibleReplies = [
  "Sorry, I'm not sure what you mean by that.",
  "Sorry, that's outside my area of expertise. I can only help you with questions about grants.",
  "You know I'm just a bot right?",
  "I'm sorry I can't help with that.",
  "You must be getting frustrated. Let me get a human to help you."
]; // add more if needed, no need to change below code, it's based on the length

module.exports = {
  label: 'None',
  callbackProvider: (builder) => {
    return [
      function (session, args, next) {
        session.dialogData.reply = possibleReplies[Math.round((Math.random()*(possibleReplies.length)))];
        session.send(session.dialogData.reply);
      }
    ];
  }
};
