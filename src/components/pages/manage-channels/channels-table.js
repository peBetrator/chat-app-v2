import React from 'react';
import './channels-table.css';

import Modal from '../../common/modal';
import ErrorMessage from '../../error-message/error-message';
import AddChannelForm from './add-channel';
import AddUserForm from './add-user';
import { connect } from 'react-redux';
import {
  makeRoomPrivate,
  makeRoomPublic,
  getRooms,
  leaveChat
} from '../../../actions';

function ChannelsTable(props) {
  const {
    rooms,
    uid,
    errorMsg,
    getRooms,
    makeRoomPublic,
    makeRoomPrivate,
    leaveChat
  } = props;

  const [showChannel, setShowC] = React.useState(false);
  const [showUser, setShowU] = React.useState(false);
  const [curRoom, setCurRoom] = React.useState('');

  const handleClose = () => {
    setShowC(false);
    setShowU(false);
  };

  const handleRights = (room, isPrivate) => {
    if (!isPrivate) makeRoomPrivate({ room, uid });
    else makeRoomPublic({ room, uid });
    getRooms(uid);
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
          <button onClick={() => leaveChat(room, uid)}>Leave chat</button>
        </td>
      </tr>
    );
  };

  return (
    <div className='channel__table'>
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
              {!errorMsg || <ErrorMessage error={errorMsg} />}
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
    errorMsg: rooms.errorMsg,

    uid: auth.user.uid
  };
};

const mapDispatchToProps = {
  makeRoomPrivate,
  makeRoomPublic,
  getRooms,
  leaveChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsTable);
