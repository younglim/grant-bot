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
  var output = '<html><body style="text-align:center"><h2>';
  console.log(USERS);
  USERS.forEach(user => {
    output += `<a href="/user/${user.user.id}">Send demo to ${user.user.name} (${user.user.id}) on ${user.channelId}</a><br />`
  });
  return output + '</h2></body></html>';
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