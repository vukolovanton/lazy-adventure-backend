const users = [];

// Join user to chat
function userJoin(id, username, room, details) {
  const user = { id, username, room, details };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function removeMonster(id, details) {
  const index = users.findIndex((user) => user.details.userId === details.userId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function updateMonsterHitPoints(id, details) {
  const index = users.findIndex((user) => user.details.userId === details.userId);
  if (index !== -1) {
    users[index].details.stats.currentHitPoints = details.currentHitPoints;
  }
}


// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  removeMonster,
  updateMonsterHitPoints,
};
