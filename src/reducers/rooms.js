import {
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_EMPTY,
  FETCH_MEMBERS_REQUEST,
  FETCH_MEMBERS_SUCCESS,
  CHANGE_ROOM_REQUEST,
  ADD_ROOM_REQUEST,
  SEARCH_ROOM_REQUEST,
  SEARCH_ROOM_SUCCESS,
  LEAVE_CHAT_REQUEST,
  EXIT_ROOM_REQUEST
} from '../actions';

export default (
  state = {
    room: '',
    rooms: [],
    loadedRooms: false,
    members: [],
    loadedMembers: false,
    noRooms: false,
    roomFound: false
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

    case FETCH_MEMBERS_REQUEST:
      return {
        ...state,
        loadedMembers: false
      };
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        loadedMembers: true,
        members: action.members
      };

    case SEARCH_ROOM_REQUEST:
      return {
        ...state,
        roomFound: false
      };
    case SEARCH_ROOM_SUCCESS:
      return {
        ...state,
        roomFound: true
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
    case LEAVE_CHAT_REQUEST:
      return {
        ...state,
        rooms: state.rooms.filter(item => item.room !== action.room)
      };

    default:
      return state;
  }
};
