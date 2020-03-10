import React, { useReducer } from 'react';

import { connect } from 'react-redux';

import Confirmation from '../../features/channels/channels-settings/confirm';
import Modal from '../components/common/modal';
import Sidebar from '../components/common/sidebar';

import UserProfile from '../sidebars/user-profile';

const initSidebar = {
  showUserProfile: false,
  confirmation: false,
};

function MemberData(props) {
  const [sidebar, setSidebar] = useReducer(
    (sidebar, details) => ({
      ...sidebar,
      ...details,
    }),
    initSidebar
  );
  const { uid, displayName, id, isSelected, room, view, select } = props;

  const handleClose = () => {
    setSidebar(initSidebar);
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
              setSidebar({ showUserProfile: true });
            }}
          >
            View profile
          </li>
          <li
            className={!view ? 'hide' : ''}
            onClick={() => {
              setSidebar({ confirmation: true });
            }}
          >
            Remove
          </li>
        </ul>
      </div>

      {sidebar.showUserProfile && (
        <Sidebar>
          <UserProfile uid={uid} handleClose={handleClose} />
        </Sidebar>
      )}
      {sidebar.confirmation && (
        <Modal>
          <Confirmation room={room} handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = ({ rooms }) => {
  return {
    room: rooms.room,
  };
};

export default connect(mapStateToProps)(MemberData);
