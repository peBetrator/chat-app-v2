import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  SEND_MESSAGE_REQUEST,
} from '../actions';

export default (
  state = {
    messages: [],
    loaded: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        messages: [],
        loaded: false,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        loaded: true,
      };

    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
      };

    default:
      return state;
  }
};
