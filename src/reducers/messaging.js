import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_ROOMS_REQUEST,
  CHANGE_ROOM_REQUEST
} from "../actions";

export default (
  state = {
    room: "global",
    rooms: [],
    messages: [],
    loaded: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        messages: action.messages
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loaded: true
      };

    case FETCH_ROOMS_REQUEST:
      return {
        ...state,
        rooms: action.rooms
      };
    case CHANGE_ROOM_REQUEST:
      return {
        ...state,
        room: action.room
      };
    default:
      return state;
  }
};
