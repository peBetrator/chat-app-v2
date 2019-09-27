// TODO remove methods which is not used in state
import { myFirebase } from '../firebase/firebase';

export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_EMPTY = 'FETCH_ROOMS_EMPTY';

export const ADD_ROOM_REQUEST = 'ADD_ROOM_REQUEST';

export const CHANGE_ROOM_REQUEST = 'CHANGE_ROOM_REQUEST';

export const EXIT_ROOM_REQUEST = 'EXIT_ROOM_REQUEST';

export const MAKE_ROOM_PIBLIC = 'MAKE_ROOM_PIBLIC';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';

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
const fetchRoomsEmpty = () => {
  return {
    type: FETCH_ROOMS_EMPTY
  };
};

const requestChangeRoom = room => {
  return {
    type: CHANGE_ROOM_REQUEST,
    room
  };
};

const exit = () => {
  return {
    type: EXIT_ROOM_REQUEST
  };
};

export const getRooms = uid => async dispatch => {
  const roomsRef = myFirebase.database().ref(`users/${uid}/rooms`);

  roomsRef.once('value').then(roomSnapshot => {
    if (roomSnapshot.exists()) {
      const rooms = Object.values(roomSnapshot.val());
      dispatch(fetchRooms(rooms));
      dispatch(fetchRoomsSuccess());
    } else dispatch(fetchRoomsEmpty());
  });
};

export const addUserToRoom = ({ uid, room }) => dispatch => {
  myFirebase
    .database()
    .ref(`chat/${room}/users/${uid}`)
    .set({
      access: true
    });
};

export const makeRoomPrivate = ({ uid, room }) => dispatch => {
  myFirebase
    .database()
    .ref(`chat/${room}/users/${uid}`)
    .set({
      access: true
    });

  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .update({
      isPrivate: true
    });
};

export const makeRoomPublic = ({ uid, room }) => dispatch => {
  myFirebase
    .database()
    .ref(`chat/${room}/users`)
    .remove();

  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}/isPrivate`)
    .remove();
};

export const exitRoom = () => dispatch => {
  dispatch(exit());
};

export const createRoom = ({ room, uid }) => dispatch => {
  const newRoom = myFirebase.database().ref(`chat/${room}/messages`);
  const chatMessage = {
    rabotyaga: true,
    message: `'${room}' was successfuly created`,
    uid: 1111111111
  };

  newRoom.push(chatMessage);
  dispatch(room => {
    return {
      type: ADD_ROOM_REQUEST,
      room
    };
  });
  addRoomToProfile(room, uid);
};

const addRoomToProfile = (room, uid) => {
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .set({ room, admin: true });
};

export const searchRoom = ({ room, uid }) => dispatch => {
  const roomRef = myFirebase.database().ref(`chat/${room}/messages`);

  roomRef.on('value', message => {
    if (message.exists()) addRoomToProfile(room, uid);
  });
};

export const changeRoom = newRoom => async dispatch => {
  dispatch(requestChangeRoom(newRoom));
};
