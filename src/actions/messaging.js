import { myFirebase } from '../firebase/firebase';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';

const fetchMessages = room => {
  return {
    type: FETCH_MESSAGES_REQUEST,
    room
  };
};
const fetchMessagesSuccess = messages => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    messages
  };
};

const sendMessageRequest = message => {
  return {
    type: SEND_MESSAGE_REQUEST,
    message
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

export const sendMessage = ({ room, user, message, uid }) => dispatch => {
  const newMessage = {
    uid,
    name: user,
    message,
    timestamp: +new Date()
  };
  const messageRef = myFirebase.database().ref(`room-messages/${room}`);

  messageRef.push(newMessage);
  dispatch(sendMessageRequest(message));
};
