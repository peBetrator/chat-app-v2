import * as actionTypes from '../actions/types';

export default (
  state = {
    isLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: '',
    signUpError: '',
    logoutError: false,
    isAuthenticated: false,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: '',
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: action.payload.message,
      };

    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        isLoggingIn: true,
        signUpError: '',
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        isAuthenticated: false,
        signUpError: action.payload.message,
      };

    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };

    case actionTypes.VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case actionTypes.VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };

    case actionTypes.CHANGE_USERNAME_SUCCESS:
      return {
        ...state,
        user: { ...state.user, displayName: action.user },
      };

    case actionTypes.UPDATE_PROFILE_IMG_URL:
      return {
        ...state,
        user: { ...state.user, photoURL: action.payload },
      };

    default:
      return state;
  }
};
