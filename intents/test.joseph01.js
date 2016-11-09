module.exports = {
  label: 'Test Joseph',
  callbackProvider: (builder) => {
    return [
      function(session, args, next) {
        console.log('|----------------------session-----------------------|');
        console.log(session);
        console.log('|---------------------/session-----------------------|');
        console.log('|------------------------args------------------------|');
        console.log(args);
        console.log('|-----------------------/args------------------------|');
        next();
      },
      function(session, args, next) {
        builder.Prompts.text(session, 'Asking a question! Type in your answer:');
      },
      function(session, result, next) {
        session.send(`You entered: ${result.response}`);
        next();
      },
      function(session, args, next) {
        builder.Prompts.choice(session, 'Make a choice!', 'Trump|Hillary|Obama');
      },
      function(session, result, next) {
        console.log(result);
        session.send(`Great work, you chose: ${result.response.entity}!!`);
        switch(result.response.index) {
          case 1: 'No one, NO one, knows bots like I do.'; break;
          case 2: 'MAKE YOUR CHOICE!!! MAKE YOUR *coughs*'; break;
          case 3: 'Aight my niggas, you didn\'t like Obamacare'; break;
        }
        next();
      },
      builder.DialogAction.send('Label:Test Joseph ends here')
    ];
  }
};