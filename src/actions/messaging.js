import { myFirebase } from '../firebase/firebase';
import * as actionTypes from './types';

const fetchMessages = room => {
  return {
    type: actionTypes.FETCH_MESSAGES_REQUEST,
    room,
  };
};
const fetchMessagesSuccess = messages => {
  return {
    type: actionTypes.FETCH_MESSAGES_SUCCESS,
    messages,
  };
};

const sendMessageRequest = message => {
  return {
    type: actionTypes.SEND_MESSAGE_REQUEST,
    message,
  };
};

export const getMessages = (room, uid) => async dispatch => {
  const messageRef = myFirebase.database().ref(`room-messages/${room}`);
  dispatch(fetchMessages(room));

  messageRef.limitToLast(20).on('value', message => {
    if (message.exists()) {
      updateLastMessageRead(room, uid).then(
        dispatch(fetchMessagesSuccess(Object.values(message.val())))
      );
    }
  });
};

export const sendMessage = data => dispatch => {
  const { user, room, uid, message } = data;

  const messageRef = myFirebase.database().ref(`room-messages/${room}`);
  const payload = {
    uid,
    name: user,
    message,
    timestamp: +new Date(),
  };

  try {
    messageRef.push(payload, error => {
      if (error) throw error;
      updateLastMessageSent(payload, room).then(
        dispatch(sendMessageRequest(message))
      );
    });
  } catch (error) {
    // TODO: dispatch error to store
    console.log(error);
  }
};

export const sendFileMessage = data => dispatch => {
  const { user, room, uid, file } = data;

  const fileUrl = `chat-files/${room}/${file.name}`;
  const storageRef = myFirebase.storage().ref(fileUrl);
  const messageRef = myFirebase.database().ref(`room-messages/${room}`);

  const uploadTask = storageRef.put(file);
  dispatch({ type: actionTypes.UPLOADING_START });

  return uploadTask.on(
    'state_changed',
    snapshot => {},
    error => {
      dispatch({ type: actionTypes.UPLOADING_FAIL, payload: error });
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        const { metadata } = data;
        const payload = {
          uid,
          name: user,
          timestamp: +new Date(),
          file: { url, metadata },
        };

        messageRef.push(payload, error => {
          error ? console.log(error) : dispatch(getMessages(room, uid));
        });
      });
    }
  );
};

export const updateLastMessageSent = (payload, room) => {
  const lastMessageRef = myFirebase
    .database()
    .ref(`room-metadata/${room}/lastMessage`);

  return lastMessageRef.set(payload);
};

const updateLastMessageRead = (room, uid) => {
  const userLastReadRef = myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}/lastRead`);
  const payload = {
    timestamp: +new Date(),
  };

  return userLastReadRef.set(payload);
};

export const getProfilePicUrl = uid => {
  const profileRef = myFirebase.database().ref(`users/${uid}/photoURL`);

  return profileRef.once('value').then(profileSnap => {
    return profileSnap.exists() ? profileSnap.val() : null;
  });
};
