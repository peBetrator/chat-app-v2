import { myFirebase } from '../firebase/firebase';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';

export const EXIT_ROOM_REQUEST = 'EXIT_ROOM_REQUEST';

const addUser = user => {
  return {
    type: ADD_USER_REQUEST,
    user
  };
};

const exit = () => {
  return {
    type: EXIT_ROOM_REQUEST
  };
};

export const addUserToRoom = ({ uid, room }) => dispatch => {
  myFirebase
    .database()
    .ref(`chat/${room}/users/${uid}`)
    .set({
      access: true
    });

  // dispatch(addUser(newUser));
};

export const exitRoom = () => dispatch => {
  dispatch(exit());
};
