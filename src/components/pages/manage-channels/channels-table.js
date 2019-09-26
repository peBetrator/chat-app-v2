import React, { Component } from 'react';

import Modal from '../../modal/modal';
import AddChannelForm from './add-channel';
import { connect } from 'react-redux';
import { addUserToRoom, makeRoomPublic, getRooms } from '../../../actions';

function Channels(props) {
  const { rooms, uid } = props;
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleRights = (room, isPrivate) => {
    if (!isPrivate) props.addUserToRoom({ room, uid });
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
          // onClick={() => onDelete(id)}
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
                  setShow(true);
                }}
              >
                Add room...
              </button>
              <Modal show={show} handleClose={handleClose}>
                <AddChannelForm handleClose={handleClose} />
              </Modal>
            </td>
          </tr>
        </tbody>
      </table>
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
  addUserToRoom,
  makeRoomPublic,
  getRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
