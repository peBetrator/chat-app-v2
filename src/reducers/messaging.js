import * as actionType from '../actions/types';

export default (
  state = {
    messages: [],
    loaded: false,
  },
  action
) => {
  switch (action.type) {
    case actionType.FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        messages: [],
        loaded: false,
      };
    case actionType.FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        loaded: true,
      };

    case actionType.SEND_MESSAGE_REQUEST:
      return {
        ...state,
      };

    default:
      return state;
  }
};
