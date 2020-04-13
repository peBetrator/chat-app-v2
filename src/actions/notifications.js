import { myFirebase } from '../firebase/firebase';
import { updateLastMessageSent } from './messaging';

export const getRoomLastMessageTimestamp = room => {
  const roomRef = myFirebase
    .database()
    .ref(`room-metadata/${room}/lastMessage`);

  return roomRef
    .once('value', roomSnapshot => {
      if (roomSnapshot.exists()) {
        return roomSnapshot;
      }
    })
    .then(roomSnapshot => roomSnapshot.val());
};

export const roomWasCreated = room => {
  const messageRef = myFirebase.database().ref(`room-messages/${room}`);
  const payload = {
    uid: '000001',
    name: 'CHAT_BOT',
    message: `${room} room was created!`,
    timestamp: +new Date(),
    notification: true,
  };

  try {
    messageRef.push(payload, error => {
      if (error) throw error;
      updateLastMessageSent(payload, room);
    });
  } catch (error) {
    // TODO: dispatch error to store
    console.log(error);
  }
};

export const userWasAddedBy = (room, user, addedBy) => {
  const messageRef = myFirebase.database().ref(`room-messages/${room}`);
  const payload = {
    uid: '000001',
    name: 'CHAT_BOT',
    message: `${addedBy} invited ${user} to chat!`,
    timestamp: +new Date(),
    notification: true,
  };

  try {
    messageRef.push(payload, error => {
      if (error) throw error;
      updateLastMessageSent(payload, room);
    });
  } catch (error) {
    console.log(error);
  }
};
