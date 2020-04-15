import { auth, myFirebase } from '../firebase/firebase';
import { addUserToRoom } from './rooms';
import * as actionTypes from './types';

const requestLogin = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};
const receiveLogin = user => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
  };
};
const loginError = errorMessage => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: errorMessage,
  };
};

const signUpError = errorMessage => {
  return {
    type: actionTypes.SIGNUP_FAILURE,
    payload: errorMessage,
  };
};

const logoutError = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE,
  };
};

const changeUsernameSuccess = user => {
  return {
    type: actionTypes.CHANGE_USERNAME_SUCCESS,
    user,
  };
};

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user.user));
    })
    .catch(error => {
      dispatch(loginError(error));
    });
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: actionTypes.LOGOUT_REQUEST,
  });
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: actionTypes.LOGOUT_SUCCESS,
      });
    })
    .catch(error => {
      dispatch(logoutError(error));
    });
};

export const verifyAuth = () => dispatch => {
  dispatch({
    type: actionTypes.VERIFY_REQUEST,
  });
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch({
      type: actionTypes.VERIFY_SUCCESS,
    });
  });
};

export const registerUser = (email, password) => dispatch => {
  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch({
        type: actionTypes.SIGNUP_REQUEST,
      });

      myFirebase
        .database()
        .ref(`users/${user.uid}`)
        .set({
          email: email,
        })
        .then(addUserToRoom('general', user.uid));
    })
    .catch(error => {
      dispatch(signUpError(error));
    });
};

export const changeName = userName => dispatch => {
  const user = myFirebase.auth().currentUser;
  const uid = user.uid;

  user
    .updateProfile({
      displayName: userName,
    })
    .then(dispatch(changeUsernameSuccess(userName)));

  myFirebase.database().ref(`users/${uid}/`).update({
    username: userName,
  });
};

export const signInWithGoogle = () => dispatch => {
  dispatch(requestLogin());

  const provider = new auth.GoogleAuthProvider();
  myFirebase
    .auth()
    .signInWithPopup(provider)
    .then(user => {
      dispatch(receiveLogin(user.user));
    })
    .catch(error => {
      dispatch(loginError(error));
      dispatch(signUpError(error));
    });
};
