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
  const { uid, myUID, displayName, id, room, view } = props;

  const handleSelect = () => {
    const { isSelected, select } = props;
    isSelected ? select(-1) : select(id);
  };

  const handleClose = () => {
    setSidebar(initSidebar);
  };

  return (
    <li key={id} onClick={handleSelect}>
      <a href={'#' + uid} data-toggle="collapse" aria-expanded="false">
        {displayName}
        {uid === myUID && ' (You)'}
      </a>
      <ul id={uid} className="collapse list-unstyled">
        <li
          onClick={() => {
            handleClose();
            setSidebar({ showUserProfile: true });
          }}
        >
          View profile
        </li>
        {view && (
          <li
            onClick={() => {
              setSidebar({ confirmation: true });
            }}
          >
            Remove
          </li>
        )}
      </ul>

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
    </li>
  );
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    myUID: auth.user.uid,
    room: rooms.room,
  };
};

export default connect(mapStateToProps)(MemberData);
