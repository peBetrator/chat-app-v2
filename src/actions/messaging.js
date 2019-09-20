import { myFirebase, db } from '../firebase/firebase';
import { async } from 'q';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

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
  dispatch(fetchMessages(room));
  const messageRef = myFirebase.database().ref('rooms/' + room);
  messageRef
    .limitToLast(10)
    .once('value')
    .then(message => {
      if (message.exists())
        dispatch(fetchMessagesSuccess(Object.values(message.val())));
    })
    .catch(error => dispatch(fetchMessagesError()));
  // messageRef.off('value'); // unsubscribe
};

export const getRooms = () => async dispatch => {
  const roomsRef = myFirebase.database().ref('rooms');
  const rooms = [];
  roomsRef.on('child_added', roomSnapshot => {
    rooms.push(roomSnapshot.key);
    if (rooms) {
      setTimeout(() => {
        dispatch(fetchRooms(rooms));
        dispatch(fetchRoomsSuccess());
      }, 1);
    }
  });
};

export const changeRoom = newRoom => async dispatch => {
  dispatch(requestChangeRoom(newRoom));
  getMessages(newRoom);
};
