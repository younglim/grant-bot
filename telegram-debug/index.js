var TelegramBot = require('node-telegram-bot-api');
var telegram = new TelegramBot('270213494:AAFZhEGda3RCFmGKHxJlWGwnNaxp7zNXzcw', { polling: true });
var jsonPrettify = require('json-pretty');
var chatId = '-150016809';

module.exports = {
  getMe: function() {
    telegram.getMe().then((response) => {
      console.log(response);
    });
  },
  logJson: function(jsObject) {
    telegram.sendMessage(chatId, jsonPrettify(jsObject));
  },
  notify: function(message) {
    telegram.sendMessage(chatId, message);
  }
};