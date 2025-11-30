const { trimStr } = require("./utils");

let users = [];

const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
  );
};

const addUser = (user) => {
  const isExist = findUser(user);

  const userRoom = trimStr(user.room);
  const roomMembers = users.filter((u) => trimStr(u.room) === userRoom);

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

const getRoomUsers = (room) => {
  return users.filter((u) => u.room === room);
};

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
