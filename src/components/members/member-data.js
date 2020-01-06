import React from 'react';
import { connect } from 'react-redux';
import './members.css';

import Confirmation from '../channels/channels-settings/confirm';
import Modal from '../common/modal';
import Sidebar from '../common/sidebar';

import UserProfile from '../sidebars/user-profile';
import UserRights from '../sidebars/user-rights';

function MemberData(props) {
  const { uid, displayName, id, isSelected, room, view, select } = props;
  const [showUserRights, setShowRights] = React.useState(false);
  const [showUserProfile, setShowProfile] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState(false);

  const handleClose = () => {
    setConfirmation(false);
    setShowRights(false);
    setShowProfile(false);
  };

  return (
    <div className="members">
      <div
        onClick={() => {
          isSelected ? select(-1) : select(id);
        }}
      >
        {displayName}
      </div>
      <div className={!isSelected ? 'hide' : 'display'}>
        <ul>
          <li
            onClick={() => {
              handleClose();
              setShowProfile(true);
            }}
          >
            View profile
          </li>
          <li
            className={!view ? 'hide' : ''}
            onClick={() => {
              handleClose();
              setShowRights(true);
            }}
          >
            Set rights
          </li>
          <li
            className={!view ? 'hide' : ''}
            onClick={() => {
              setConfirmation(true);
            }}
          >
            Remove
          </li>
        </ul>
      </div>

      <Sidebar show={showUserRights} handleClose={handleClose}>
        <UserRights uid={uid} />
      </Sidebar>
      <Sidebar show={showUserProfile} handleClose={handleClose}>
        <UserProfile uid={uid} name={displayName} />
      </Sidebar>
      <Modal show={confirmation} handleClose={handleClose}>
        <Confirmation room={room} handleClose={handleClose} />
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ rooms }) => {
  return {
    room: rooms.room,
  };
};

export default connect(mapStateToProps)(MemberData);