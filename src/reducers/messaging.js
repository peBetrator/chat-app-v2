import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  CHANGE_ROOM_REQUEST
} from '../actions';

export default (
  state = {
    room: 'global',
    rooms: [],
    messages: [],
    loaded: false,
    loadedRooms: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        room: action.room
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        loaded: true
      };

    case FETCH_ROOMS_REQUEST:
      return {
        ...state,
        rooms: action.rooms
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        loadedRooms: true
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
