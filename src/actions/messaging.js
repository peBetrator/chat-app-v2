import { myFirebase } from "../firebase/firebase";

export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

export const FETCH_ROOMS_REQUEST = "FETCH_ROOMS_REQUEST";

export const CHANGE_ROOM_REQUEST = "CHANGE_ROOM_REQUEST";

const fetchMessages = messages => {
  return {
    type: FETCH_MESSAGES_REQUEST,
    messages
  };
};
const fetchMessagesSuccess = () => {
  return {
    type: FETCH_MESSAGES_SUCCESS
  };
};
const fetchMessagesError = () => {
  return {
    type: FETCH_MESSAGES_FAILURE
  };
};

const fetchRooms = rooms => {
  return {
    type: CHANGE_ROOM_REQUEST,
    rooms
  };
};

const requestChangeRoom = room => {
  return {
    type: CHANGE_ROOM_REQUEST,
    room
  };
};

export const getMessages = room => dispatch => {
  const messageRef = myFirebase.database().ref("rooms/" + room);
  // TODO make message requesting async to handle loading
  messageRef.limitToLast(10).on("value", message => {
    if (message.exists()) dispatch(fetchMessages(Object.values(message.val())));
  });
  messageRef.off("value");
};

export const getRooms = () => dispatch => {
  const roomsRef = myFirebase.database().ref("rooms");
  const rooms = [];
  roomsRef.on("child_added", roomSnapshot => {
    rooms.push(roomSnapshot.key);
  });
  dispatch(fetchRooms(rooms));
};

export const changeRoom = newRoom => dispatch => {
  dispatch(requestChangeRoom(newRoom));
  getMessages(newRoom);
};
