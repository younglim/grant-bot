var USERS = [];
var USER_MAP = {};

function pushUser(sessionMessageAddress) {
  USER_MAP[sessionMessageAddress.user.id] = USERS.length;
  USERS.push(sessionMessageAddress);
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
  pushUser
};