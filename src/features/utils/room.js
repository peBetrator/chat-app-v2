export const buildRoomTitle = (...users) => {
  return users.join('-');
};

export const formatDMTitle = (room, uid) => {
  const toRemove = new RegExp(`-?${uid}-?`);
  return room.replace(toRemove, '');
};
