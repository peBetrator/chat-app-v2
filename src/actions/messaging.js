import { myFirebase } from '../firebase/firebase';
import { resolve } from 'dns';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';

export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';

export const CHANGE_ROOM_REQUEST = 'CHANGE_ROOM_REQUEST';

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
const fetchMessagesError = () => {
  return {
    type: FETCH_MESSAGES_FAILURE
  };
};

const sendMessageRequest = message => {
  return {
    type: SEND_MESSAGE_REQUEST,
    message
  };
};

const fetchRooms = rooms => {
  return {
    type: FETCH_ROOMS_REQUEST,
    rooms
  };
};
const fetchRoomsSuccess = () => {
  return {
    type: FETCH_ROOMS_SUCCESS
  };
};

const requestChangeRoom = room => {
  return {
    type: CHANGE_ROOM_REQUEST,
    room
  };
};

export const getMessages = room => async dispatch => {
  const messageRef = myFirebase.database().ref(`chat/${room}/messages`);
  dispatch(fetchMessages(room));

  messageRef.limitToLast(10).on('value', message => {
    if (message.exists())
      dispatch(fetchMessagesSuccess(Object.values(message.val())));
  });
  // messageRef.off('value'); // unsubscribe
};

export const getRooms = uid => async dispatch => {
  const roomsRef = myFirebase
    .database()
    .ref('users/rWzQDrOtOtOXMd8BVJtOsPvg4ih2/rooms'); //(`users/${uid}/rooms`);

  roomsRef.once('value', roomSnapshot => {
    if (roomSnapshot.exists()) {
      const rooms = Object.values(roomSnapshot.val());
      dispatch(fetchRooms(rooms));
      dispatch(fetchRoomsSuccess());
    }
  });
};

export const sendMessage = ({ room, user, message, uid }) => dispatch => {
  const newMessage = {
    userName: user,
    message,
    uid
  };
  const messageRef = myFirebase.database().ref(`chat/${room}/messages`);

  messageRef.push(newMessage);
  dispatch(sendMessageRequest(message));
};

export const changeRoom = newRoom => async dispatch => {
  dispatch(requestChangeRoom(newRoom));
};
