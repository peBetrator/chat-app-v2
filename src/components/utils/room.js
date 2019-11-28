export const buildRoomTitle = (...users) => {
  return users.join('-');
};

export const formatDMTitle = (room, userName) => {
  const toRemove = new RegExp(`-?${userName}-?`);

  return room.replace(toRemove, '');
};
