const { trimStr } = require("./utils");

let users = [];

// Find user by name and room
const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
  );
};

// Add user to the room
const addUser = (user) => {
  const isExist = findUser(user);

  const userRoom = trimStr(user.room);
  const roomMembers = users.filter((u) => trimStr(u.room) === userRoom);

  // If the room is empty, the first user becomes Admin
  const isAdmin = roomMembers.length === 0;

  const newUser = { ...user, isAdmin };

  if (!isExist) {
    users.push(newUser);
  }

  const currentUser = isExist || newUser;

  if (isExist && roomMembers.length === 0) {
    currentUser.isAdmin = true;
  }

  return { isExist: !!isExist, user: currentUser };
};

// Get all users in a specific room
const getRoomUsers = (room) => {
  return users.filter((u) => u.room === room);
};

// Remove user from the room
const removeUser = (user) => {
  const found = findUser(user);

  if (found) {
    users = users.filter(
      (u) =>
        !(
          trimStr(u.room) === trimStr(found.room) &&
          trimStr(u.name) === trimStr(found.name)
        )
    );
  }

  return found;
};

module.exports = { addUser, findUser, getRoomUsers, removeUser };
