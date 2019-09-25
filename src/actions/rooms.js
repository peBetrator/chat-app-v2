import { myFirebase } from '../firebase/firebase';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';

const addUser = user => {
  return {
    type: ADD_USER_REQUEST,
    user
  };
};

export const addUserToRoom = ({ uid, room }) => dispatch => {
  // const newUser = {
  //   uid
  // };

  myFirebase
    .database()
    .ref(`chat/${room}/users/${uid}`)
    .set({
      access: true
    });

  // dispatch(addUser(newUser));
};
