module.exports = () => {
  return (session, result, next) => {
    const userSaidYes = result.response;
    if(userSaidYes) {
      session.send('Ask away!');
      session.endDialog();
    } else {
      session.send('Thank you for stopping by. Drop by anytime if you need more help.');
      session.endConversation();
    }
  };
};