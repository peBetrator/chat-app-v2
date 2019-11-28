import {
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_EMPTY,
  FETCH_MEMBERS_REQUEST,
  FETCH_MEMBERS_SUCCESS,
  CREATE_ROOM_SUCCESS,
  CHANGE_ROOM_REQUEST,
  ADD_ROOM_REQUEST,
  SEARCH_ROOM_REQUEST,
  SEARCH_ROOM_SUCCESS,
  LEAVE_CHAT_REQUEST,
  EXIT_ROOM_REQUEST,
  ERROR_CATCHED,
} from '../actions';

const fiterRooms = (state, rooms) => {
  const publicRooms = [];
  const dms = [];
  const favoriteRooms = [];
  const privateRooms = rooms.filter(room => {
    if (room.favorite && room.favorite === true) {
      favoriteRooms.push(room);
      return false;
    }

    if (room.DM && room.DM === true) {
      dms.push(room);
      return false;
    }

    if (!room.admin) {
      publicRooms.push(room);
      return false;
    }
    return true;
  });

  return {
    ...state,
    rooms: publicRooms,
    dms,
    privateRooms,
    favoriteRooms,

    loadedRooms: true,
    noRooms: false,
  };
};

export default (
  state = {
    room: '',
    rooms: [],
    dms: [],
    privateRooms: [],
    favoriteRooms: [],
    loadedRooms: false,
    members: [],
    loadedMembers: false,
    noRooms: false,
    roomFound: false,
    errorMsg: '',
  },
  action
) => {
  switch (action.type) {
    case FETCH_ROOMS_REQUEST:
      return {
        ...state,
        loadedRooms: false,
      };
    case FETCH_ROOMS_SUCCESS:
      return fiterRooms(state, action.rooms);
    case FETCH_ROOMS_EMPTY:
      return {
        ...state,
        noRooms: true,
      };

    case FETCH_MEMBERS_REQUEST:
      return {
        ...state,
        loadedMembers: false,
      };
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        loadedMembers: true,
        members: action.members,
      };

    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        privateRooms: [
          ...state.privateRooms,
          { room: action.room, admin: true },
        ],
      };

    case SEARCH_ROOM_REQUEST:
      return {
        ...state,
        roomFound: false,
      };
    case SEARCH_ROOM_SUCCESS:
      return {
        ...state,
        roomFound: true,
      };

    case ADD_ROOM_REQUEST:
      return {
        ...state,
        rooms: [...state.rooms, action.room],
      };

    case CHANGE_ROOM_REQUEST:
      return {
        ...state,
        room: action.room,
      };

    case EXIT_ROOM_REQUEST:
      return {
        ...state,
        room: '',
      };
    case LEAVE_CHAT_REQUEST:
      return {
        ...state,
        rooms: state.rooms.filter(item => item.room !== action.room),
      };

    case ERROR_CATCHED:
      return {
        ...state,
        errorMsg: action.error,
      };

    default:
      return state;
  }
};
