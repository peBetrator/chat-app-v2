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

export const getMessages = room => async dispatch => {
  const messageRef = myFirebase.database().ref(`room-messages/${room}`);
  dispatch(fetchMessages(room));

  messageRef.limitToLast(10).on('value', message => {
    if (message.exists())
      dispatch(fetchMessagesSuccess(Object.values(message.val())));
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

  messageRef.push(payload, error => {
    error ? console.log(error) : dispatch(sendMessageRequest(message));
  });
};

export const sendFileMessage = data => dispatch => {
  const { user, room, uid, message, file } = data;

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
          message,
          timestamp: +new Date(),
          file: { url, metadata },
        };

        messageRef.push(payload, error => {
          error ? console.log(error) : dispatch(sendMessageRequest(message));
        });
      });
    }
  );
};

export const getProfilePicUrl = uid => {
  const profileRef = myFirebase.database().ref(`users/${uid}/photoURL`);

  return profileRef.once('value').then(profileSnap => {
    return profileSnap.exists() ? profileSnap.val() : null;
  });
};
