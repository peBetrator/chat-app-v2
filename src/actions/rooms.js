// TODO remove methods which are not used in state
// move here all methods using firebase connection
import { myFirebase } from '../firebase/firebase';

export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_EMPTY = 'FETCH_ROOMS_EMPTY';

export const FETCH_MEMBERS_REQUEST = 'FETCH_MEMBERS_REQUEST';
export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS';

export const SEARCH_ROOM_REQUEST = 'SEARCH_ROOM_REQUEST';
export const SEARCH_ROOM_SUCCESS = 'SEARCH_ROOM_SUCCESS';

export const ADD_ROOM_REQUEST = 'ADD_ROOM_REQUEST';

export const CHANGE_ROOM_REQUEST = 'CHANGE_ROOM_REQUEST';

export const EXIT_ROOM_REQUEST = 'EXIT_ROOM_REQUEST';
export const LEAVE_CHAT_REQUEST = 'LEAVE_CHAT_REQUEST';

export const MAKE_ROOM_PUBLIC = 'MAKE_ROOM_PUBLIC';
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

const fetchMembersRequest = () => {
  return {
    type: FETCH_MEMBERS_REQUEST
  };
};
const fetchMembersSuccess = members => {
  return {
    type: FETCH_MEMBERS_SUCCESS,
    members
  };
};

const searchRoomRequest = () => {
  return {
    type: SEARCH_ROOM_REQUEST
  };
};
const foundRoom = () => {
  return {
    type: SEARCH_ROOM_SUCCESS
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
const leaveChatRequest = room => {
  return {
    type: LEAVE_CHAT_REQUEST,
    room
  };
};

export const getRooms = uid => dispatch => {
  const roomsRef = myFirebase.database().ref(`users/${uid}/rooms`);

  roomsRef.once('value').then(roomSnapshot => {
    if (roomSnapshot.exists()) {
      const rooms = Object.values(roomSnapshot.val());
      dispatch(fetchRooms(rooms));
      dispatch(fetchRoomsSuccess());
    } else dispatch(fetchRoomsEmpty());
  });
};

export const getMembers = room => dispatch => {
  const roomRef = myFirebase.database().ref(`room-metadata/${room}/authorized-users`);
  const userRef = myFirebase.database().ref(`users/`);
  const members = [];

  dispatch(fetchMembersRequest());
  roomRef.once('value').then(usersSnapshot => {
    if (usersSnapshot.exists()) {
      const uids = Object.keys(usersSnapshot.val());
      uids.forEach(uid => {
        userRef
          .child(uid)
          .once('value')
          .then(memberSnapshot => {
            if (memberSnapshot.exists()) {
              // TODO store in DB username and fetch it || email
              members.push(memberSnapshot.val().email);
            }
            if (uids.length === members.length)
              dispatch(fetchMembersSuccess(members));
          });
      });
    }
  });
};

export const makeRoomPrivate = ({ uid, room }) => dispatch => {
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .update({
      isPrivate: true
    });

  myFirebase
    .database()
    .ref(`room-metadata/${room}`)
    .update({
      isPrivate: true
    });
};

export const makeRoomPublic = ({ uid, room }) => dispatch => {
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}/isPrivate`)
    .remove();

  myFirebase
    .database()
    .ref(`room-metadata/${room}/isPrivate`)
    .remove();
};

export const exitRoom = () => dispatch => {
  dispatch(exit());
};

export const leaveChat = (room, uid) => dispatch => {
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .remove();

  dispatch(leaveChatRequest(room));
};

export const createRoom = ({ room, uid }) => dispatch => {
  const newRoom = myFirebase.database().ref(`room-messages/${room}/`);
  const chatMessage = {
    rabotyaga: true,
    message: `'${room}' was successfuly created`,
    uid: 1111111111
  };
  newRoom.push(chatMessage);

  addUserToRoom(room, uid)(dispatch);
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .update({ admin: true });
};

export const addUserToRoom = (room, uid) => dispatch => {
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .update({ room });

  myFirebase
    .database()
    .ref(`room-metadata/${room}/authorized-users/${uid}`)
    .update({
      access: true
    });
};

export const searchRoom = ({ room, uid }) => dispatch => {
  const roomRef = myFirebase.database().ref(`room-messages/${room}/`);

  roomRef.once('value').then(message => {
    if (message.exists()) {
      addUserToRoom(room, uid);
      dispatch(foundRoom());
      addUserToRoom(room, uid)(dispatch);
      setTimeout(() => {
        dispatch(searchRoomRequest());
      }, 1000);
    }
  });
};

export const changeRoom = newRoom => async dispatch => {
  dispatch(requestChangeRoom(newRoom));
};
