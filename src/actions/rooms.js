// TODO remove methods which are not used in state
import { myFirebase } from '../firebase/firebase';
import * as actionTypes from './types';

import { roomWasCreated } from './notifications';

const fetchRooms = () => {
  return {
    type: actionTypes.FETCH_ROOMS_REQUEST,
  };
};
const fetchRoomsSuccess = rooms => {
  return {
    type: actionTypes.FETCH_ROOMS_SUCCESS,
    rooms,
  };
};
const fetchRoomsEmpty = () => {
  return {
    type: actionTypes.FETCH_ROOMS_EMPTY,
  };
};

const fetchMembersRequest = () => {
  return {
    type: actionTypes.FETCH_MEMBERS_REQUEST,
  };
};
const fetchMembersSuccess = members => {
  return {
    type: actionTypes.FETCH_MEMBERS_SUCCESS,
    members,
  };
};

const createRoomSuccess = room => {
  return {
    type: actionTypes.CREATE_ROOM_SUCCESS,
    room,
  };
};

const searchRoomRequest = () => {
  return {
    type: actionTypes.SEARCH_ROOM_REQUEST,
  };
};
const foundRoom = () => {
  return {
    type: actionTypes.SEARCH_ROOM_SUCCESS,
  };
};

const leaveChatRequest = room => {
  return {
    type: actionTypes.LEAVE_CHAT_REQUEST,
    room,
  };
};

const catchError = error => {
  return {
    type: actionTypes.ERROR_CATCHED,
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

  myFirebase.database().ref().update(paths);
};

export const makeRoomPublic = ({ uid, room }) => dispatch => {
  myFirebase.database().ref(`users/${uid}/rooms/${room}/isPrivate`).remove();

  myFirebase.database().ref(`room-metadata/${room}/isPrivate`).remove();
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
  myFirebase.database().ref(`users/${uid}/rooms/${room}`).remove();

  dispatch(leaveChatRequest(room));
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

        myFirebase.database().ref().update(profilePaths);
      },
      error => {
        dispatch(catchError(error));
      }
    );
};

export const addUserToRoom = (room, uid) => {
  myFirebase.database().ref(`users/${uid}/rooms/${room}`).update({ room });

  return myFirebase
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

export const isAdmin = (uid, room) => {
  const userRef = myFirebase.database().ref(`users/${uid}/rooms/${room}/admin`);

  return userRef.once('value').then(userSnap => {
    return userSnap.exists();
  });
};

export const searchUserByEmail = email => {
  const usersRef = myFirebase.database().ref('users');

  return usersRef
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(userSnapshot => {
      if (userSnapshot.exists()) {
        const foundData = Object.entries(userSnapshot.val())[0];
        return {
          foundUID: foundData[0],
          foundUsername: foundData[1].username || foundData[1].email,
        };
      }
    });
};

export const searchUserByUid = uid => {
  const usersRef = myFirebase.database().ref(`users/${uid}`);

  return usersRef.once('value').then(userSnapshot => {
    if (userSnapshot.exists()) {
      const { username, email } = userSnapshot.val();
      return { foundUID: uid, foundUsername: username || email };
    }
  });
};

export const createRoom = (room, uid) => {
  const roomRef = myFirebase.database().ref(`/room-metadata/${room}`);
  const userRef = myFirebase.database().ref(`/users/${uid}/rooms/${room}`);

  return roomRef.set({ createdByUser: uid, room }).then(() => {
    return userRef.update({ admin: true }).then(() => {
      roomWasCreated(room);
      return addUserToRoom(room, uid);
    });
  });
};

export const searchRoom = (room, uid) => {
  const roomRef = myFirebase.database().ref(`room-metadata/${room}/`);

  return roomRef.once('value').then(roomSnapshot => {
    if (roomSnapshot.exists()) {
      return addUserToRoom(room, uid);
    }
    throw new Error('No room was found');
  });
};

export const changeRoom = newRoom => async dispatch => {
  dispatch({
    type: actionTypes.CHANGE_ROOM_REQUEST,
    room: newRoom,
  });
};

export const exitRoom = () => dispatch => {
  dispatch({
    type: actionTypes.EXIT_ROOM_REQUEST,
  });
};

export const clearError = () => dispatch => {
  dispatch(catchError(''));
};

export const getRoomGroupImg = room => {
  const roomRef = myFirebase.database().ref(`room-metadata/${room}/photoURL`);

  return roomRef.once('value').then(roomSnap => {
    return roomSnap.exists() ? roomSnap.val() : null;
  });
};
