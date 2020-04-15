import React, { useReducer } from 'react';
import '../components/header/app-header.css';
import { connect } from 'react-redux';

import { exitRoom, logoutUser } from '../../actions';

import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import SVGIcon from '../components/common/svg';
import Modal from '../components/common/modal';
import AddChannelForm from '../../pages/manage-channels/add-channel';

function ProfileMenu(props) {
  const { userName, uid, exitRoom, logoutUser } = props;
  const [profileMenu, setProfileMenu] = useReducer(
    (profileMenu, details) => ({
      ...profileMenu,
      ...details,
    }),
    {
      anchorEl: null,
      addRoomModal: false,
      error: '',
    }
  );

  const handleClick = event => {
    setProfileMenu({ anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    exitRoom();
    setProfileMenu({ anchorEl: null });
  };

  const toogleModal = () => {
    setProfileMenu({ addRoomModal: !profileMenu.addRoomModal });
  };

  const handleCreateRoom = () => {
    handleClose();
    toogleModal();
  };

  return (
    <div className="sidebar-header">
      <div className="app__profile" onClick={handleClick}>
        {userName}
        <SVGIcon
          className="profile__icon"
          name="profile"
          width={20}
          fill="#fff"
        />
      </div>

      <Menu
        id="simple-menu"
        anchorEl={profileMenu.anchorEl}
        keepMounted
        open={Boolean(profileMenu.anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={'/profile'} onClick={handleClose}>
          My profile
        </MenuItem>
        <MenuItem onClick={handleCreateRoom}>Create Room</MenuItem>
        <MenuItem component={Link} to={'/channels'} onClick={handleClose}>
          My channels
        </MenuItem>
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </Menu>

      {profileMenu.addRoomModal && (
        <Modal title="Add Room">
          <AddChannelForm uid={uid} handleClose={toogleModal} />
        </Modal>
      )}
    </div>
  );
}

function mapStateToProps({ auth, rooms }) {
  const userName = auth.user.displayName || auth.user.email;
  return {
    userName,
    uid: auth.user.uid,
    room: rooms.room,
  };
}

const mapDispatchToProps = {
  exitRoom,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
