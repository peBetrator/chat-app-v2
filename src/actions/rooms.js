// TODO remove methods which are not used in state
import { myFirebase } from '../firebase/firebase';

export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_EMPTY = 'FETCH_ROOMS_EMPTY';

export const FETCH_MEMBERS_REQUEST = 'FETCH_MEMBERS_REQUEST';
export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS';

export const SEARCH_ROOM_REQUEST = 'SEARCH_ROOM_REQUEST';
export const SEARCH_ROOM_SUCCESS = 'SEARCH_ROOM_SUCCESS';

export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';

export const ADD_ROOM_REQUEST = 'ADD_ROOM_REQUEST';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';

export const CHANGE_ROOM_REQUEST = 'CHANGE_ROOM_REQUEST';

export const EXIT_ROOM_REQUEST = 'EXIT_ROOM_REQUEST';
export const LEAVE_CHAT_REQUEST = 'LEAVE_CHAT_REQUEST';

export const MAKE_ROOM_PUBLIC = 'MAKE_ROOM_PUBLIC';

export const ERROR_CATCHED = 'ERROR_CATCHED';

const fetchRooms = () => {
  return {
    type: FETCH_ROOMS_REQUEST,
  };
};
const fetchRoomsSuccess = rooms => {
  return {
    type: FETCH_ROOMS_SUCCESS,
    rooms,
  };
};
const fetchRoomsEmpty = () => {
  return {
    type: FETCH_ROOMS_EMPTY,
  };
};

const fetchMembersRequest = () => {
  return {
    type: FETCH_MEMBERS_REQUEST,
  };
};
const fetchMembersSuccess = members => {
  return {
    type: FETCH_MEMBERS_SUCCESS,
    members,
  };
};

const createRoomSuccess = room => {
  return {
    type: CREATE_ROOM_SUCCESS,
    room,
  };
};

const searchRoomRequest = () => {
  return {
    type: SEARCH_ROOM_REQUEST,
  };
};
const foundRoom = () => {
  return {
    type: SEARCH_ROOM_SUCCESS,
  };
};

const leaveChatRequest = room => {
  return {
    type: LEAVE_CHAT_REQUEST,
    room,
  };
};

const catchError = error => {
  return {
    type: ERROR_CATCHED,
    error,
  };
};

export const getRooms = uid => dispatch => {
  const roomsRef = myFirebase.database().ref(`users/${uid}/rooms`);
  dispatch(fetchRooms());

  roomsRef.on('value', roomSnapshot => {
    if (roomSnapshot.exists()) {
      const rooms = Object.values(roomSnapshot.val());
      dispatch(fetchRoomsSuccess(rooms));
    } else dispatch(fetchRoomsEmpty());
  });
};

export const getMembers = room => dispatch => {
  const roomRef = myFirebase
    .database()
    .ref(`room-metadata/${room}/authorized-users`);
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
              members.push({
                uid: uid,
                email: memberSnapshot.val().email,
                userName: memberSnapshot.val().username,
              });
            }
            if (uids.length === members.length)
              dispatch(fetchMembersSuccess(members));
          });
      });
    }
  });
};

export const makeRoomPrivate = ({ uid, room }) => dispatch => {
  const paths = {};
  const data = { isPrivate: true };

  paths[`/users/${uid}/rooms/${room}`] = data;
  paths[`/room-metadata/${room}`] = data;

  myFirebase
    .database()
    .ref()
    .update(paths);
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

export const makeRoomFavorite = (room, uid) => dispatch => {
  const roomRef = myFirebase.database().ref(`users/${uid}/rooms/${room}/`);

  roomRef.once('value').then(roomSnapshot => {
    if (roomSnapshot.child('favorite').exists()) {
      roomRef
        .child('favorite')
        .remove()
        .then(() => {
          dispatch(getRooms(uid));
        });
    } else {
      roomRef.update({ favorite: true }).then(() => {
        dispatch(getRooms(uid));
      });
    }
  });
};

export const leaveChat = (room, uid) => dispatch => {
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .remove();

  dispatch(leaveChatRequest(room));
};

export const createRoom = (room, uid) => dispatch => {
  myFirebase
    .database()
    .ref(`/room-metadata/${room}`)
    .update({ createdByUser: uid, room })
    .then(
      () => {
        addUserToRoom(room, uid);
        myFirebase
          .database()
          .ref(`/users/${uid}/rooms/${room}`)
          .update({ admin: true });
      },
      error => {
        dispatch(catchError(error));
      }
    );
};

export const createDM = (room, { uid, dmuid }) => dispatch => {
  myFirebase
    .database()
    .ref(`room-metadata/${room}`)
    .update({ room, createdByUser: uid })
    .then(
      () => {
        const profilePaths = {};
        const roomData = {
          DM: true,
          room,
        };

        profilePaths[`/users/${uid}/rooms/${room}`] = roomData;
        profilePaths[`/users/${dmuid}/rooms/${room}`] = roomData;

        addUserToRoom(room, uid);
        addUserToRoom(room, dmuid);

        myFirebase
          .database()
          .ref()
          .update(profilePaths);
      },
      error => {
        dispatch(catchError(error));
      }
    );
};

export const addUserToRoom = (room, uid) => {
  myFirebase
    .database()
    .ref(`users/${uid}/rooms/${room}`)
    .update({ room });

  myFirebase
    .database()
    .ref(`room-metadata/${room}/authorized-users/${uid}`)
    .update({
      access: true,
    });
};

export const handleUserRights = (room, uid) => dispatch => {
  const roomRef = myFirebase
    .database()
    .ref(`room-metadata/${room}/moderators/${uid}`);

  roomRef.once('value').then(roomSnapshot => {
    if (roomSnapshot.exists()) {
      roomRef.remove().then(() => {
        // dispatch(getRooms(uid));
      });
    } else {
      roomRef.update({ uid }).then(() => {
        // dispatch(getRooms(uid));
      });
    }
  });
};

export const getDmRoomTitle = uid => {
  const userRef = myFirebase.database().ref(`users/${uid}/username`);

  return userRef.once('value').then(userSnapshot => {
    if (userSnapshot.exists()) {
      return userSnapshot.val();
    }
  });
};

export const getUserRights = (room, uid) => {
  const roomRef = myFirebase
    .database()
    .ref(`room-metadata/${room}/moderators/${uid}`);

  return roomRef.once('value').then(roomSnapshot => {
    return roomSnapshot.exists();
  });
};

export const searchRoom = (room, uid) => dispatch => {
  const roomRef = myFirebase.database().ref(`room-metadata/${room}/`);

  roomRef.once('value').then(
    roomSnap => {
      if (roomSnap.exists()) {
        addUserToRoom(room, uid);
        dispatch(foundRoom());
        setTimeout(() => {
          dispatch(searchRoomRequest());
        }, 1000);
      }
    },
    error => {
      dispatch(catchError(error));
    }
  );
};

export const changeRoom = newRoom => async dispatch => {
  dispatch({
    type: CHANGE_ROOM_REQUEST,
    room: newRoom,
  });
};

export const exitRoom = () => dispatch => {
  dispatch({
    type: EXIT_ROOM_REQUEST,
  });
};

export const clearError = () => dispatch => {
  dispatch(catchError(''));
};
