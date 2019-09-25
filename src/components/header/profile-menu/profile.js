import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../app-header.css';

import ChangeUserName from './change-user-name';
import { connect } from 'react-redux';
import { addUserToRoom, logoutUser } from '../../../actions';

function ProfileMenu(props) {
  const userName = props.userName || props.email;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input, setInput] = React.useState(false);

  const { addUser, logout } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeUserName = () => {
    setInput(true);
    handleClose();
  };

  return (
    <div>
      {input ? (
        <ChangeUserName
          name={userName}
          onChange={() => {
            setInput(false);
          }}
        />
      ) : (
        <button className='app__button' onClick={handleClick}>
          {userName}
        </button>
      )}
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleChangeUserName}>Change display name</MenuItem>
        <MenuItem onClick={handleClose}>wip: My account</MenuItem>
        <MenuItem
          onClick={e => {
            e.preventDefault();
            addUser({ uid: props.uid, room: props.room });
          }}
        >
          Add user to group
        </MenuItem>
        <MenuItem
          onClick={e => {
            logout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

function mapStateToProps({ auth, messaging }) {
  return {
    uid: auth.user.uid,
    userName: auth.user.displayName,
    email: auth.user.email,

    room: messaging.room
  };
}

const mapDispatchToProps = {
  addUser: addUserToRoom,
  logout: logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMenu);
