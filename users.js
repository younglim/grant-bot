const telegramDebug = require('./telegram-debug');

var USERS = [];
var USER_MAP = {};

function pushUser(sessionMessageAddress) {
  telegramDebug.logJson(sessionMessageAddress);
  USER_MAP[sessionMessageAddress.user.id] = USERS.length;
  USERS.push(sessionMessageAddress);
};

function getId(userId) {
  return USERS[USER_MAP[userId]];
};

function getUsers() {
  const output = [];
  USERS.forEach(user => {
    output.push(user.user.id);
  });
  return output;
};

function getUserList() {
  return USERS;
};

module.exports = {
  getUsers,
  getUserList,
  getId,
  pushUser
};