module.exports = (builder) => {
  return (session, result) => {
    builder.Prompts.confirm(session, 'Is there anything else I can help you with today?');
  };
};