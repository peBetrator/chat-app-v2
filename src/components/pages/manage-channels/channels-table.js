import React from 'react';

import Modal from '../../modal/modal';
import AddChannelForm from './add-channel';
import AddUserForm from './add-user';
import { connect } from 'react-redux';
import { makeRoomPrivate, makeRoomPublic, getRooms } from '../../../actions';

function Channels(props) {
  const { rooms, uid } = props;
  const [showChannel, setShowC] = React.useState(false);
  const [showUser, setShowU] = React.useState(false);
  const [curRoom, setCurRoom] = React.useState('');

  const handleClose = () => {
    setShowC(false);
    setShowU(false);
  };

  const handleRights = (room, isPrivate) => {
    if (!isPrivate) props.makeRoomPrivate({ room, uid });
    else props.makeRoomPublic({ room, uid });
    props.getRooms(uid);
  };

  const renderRow = ({ room, admin, isPrivate }, idx) => {
    return (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{room}</td>
        <td>
          <button
            onClick={() => {
              setShowU(true);
              setCurRoom(room);
            }}
          >
            Add user
          </button>
          <button
            disabled={!admin}
            onClick={() => {
              handleRights(room, isPrivate);
            }}
          >
            {isPrivate ? 'Make Public' : 'Make Private'}
          </button>
          <button
          // onClick={() => onDecrease(id)}
          >
            Leave chat
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2>Manage Your Channels</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Channel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(renderRow)}
          <tr>
            <td colSpan='3'>
              <button
                onClick={() => {
                  setShowC(true);
                }}
              >
                Add room...
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal show={showChannel || showUser} handleClose={handleClose}>
        {showChannel ? (
          <AddChannelForm handleClose={handleClose} />
        ) : (
          <AddUserForm room={curRoom} handleClose={handleClose} />
        )}
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    rooms: rooms.rooms,

    uid: auth.user.uid
  };
};

const mapDispatchToProps = {
  makeRoomPrivate,
  makeRoomPublic,
  getRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
