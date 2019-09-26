import {
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_EMPTY,
  CHANGE_ROOM_REQUEST,
  ADD_ROOM_REQUEST,
  EXIT_ROOM_REQUEST
} from '../actions';

export default (
  state = {
    room: '',
    rooms: [],
    loadedRooms: false,
    noRooms: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_ROOMS_REQUEST:
      return {
        ...state,
        rooms: action.rooms
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        loadedRooms: true,
        noRooms: false
      };
    case FETCH_ROOMS_EMPTY:
      return {
        ...state,
        noRooms: true
      };

    case ADD_ROOM_REQUEST:
      return {
        ...state,
        rooms: [...state.rooms, action.room]
      };

    case CHANGE_ROOM_REQUEST:
      return {
        ...state,
        room: action.room
      };

    case EXIT_ROOM_REQUEST:
      return {
        ...state,
        room: ''
      };

    default:
      return state;
  }
};
