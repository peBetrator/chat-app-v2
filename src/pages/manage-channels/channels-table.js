import React, { useState, useReducer } from 'react';
import './add-channel.css';

import { connect } from 'react-redux';
import {
  makeRoomPrivate,
  makeRoomPublic,
  getRooms,
  leaveChat,
} from '../../actions';

import Modal from '../../features/components/common/modal';
import Confirmation from '../../features/channels/channels-settings/confirm';
import ErrorMessage from '../../features/components/error-message/error-message';
import AddChannelForm from './add-channel';
import AddUserForm from './add-user';

const initModals = {
  showUser: false,
  showChannel: false,
  confirmation: false,
};

function ChannelsTable(props) {
  const [curRoom, setCurRoom] = useState('');
  const [modals, setModals] = useReducer(
    (modals, details) => ({ ...modals, ...details }),
    initModals
  );

  const { rooms, uid, errorMsg } = props;

  const handleClose = () => {
    setModals(initModals);
  };

  const handleRights = (room, isPrivate) => {
    const { getRooms, makeRoomPublic, makeRoomPrivate } = props;

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
              setModals({ showUser: true });
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
            onClick={() => {
              setModals({ confirmation: true });
              setCurRoom(room);
            }}
          >
            Leave chat
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="channel__table">
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
            <td colSpan="3">
              {!errorMsg || <ErrorMessage error={errorMsg} />}
              <button
                onClick={() => {
                  setModals({ showChannel: true });
                }}
              >
                Add room...
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {(modals.showChannel || modals.showUser) && (
        <Modal>
          {modals.showChannel ? (
            <AddChannelForm handleClose={handleClose} />
          ) : (
            <AddUserForm room={curRoom} handleClose={handleClose} />
          )}
        </Modal>
      )}

      {modals.confirmation && (
        <Modal>
          <Confirmation room={curRoom} handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    rooms: [...rooms.favoriteRooms, ...rooms.rooms, ...rooms.privateRooms],
    errorMsg: rooms.errorMsg,

    uid: auth.user.uid,
  };
};

const mapDispatchToProps = {
  makeRoomPrivate,
  makeRoomPublic,
  getRooms,
  leaveChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsTable);
