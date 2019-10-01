import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../app-header.css';

import ChangeUserName from './change-user-name';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { exitRoom, logoutUser } from '../../../actions';

function ProfileMenu(props) {
  const userName = props.userName || props.email;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input, setInput] = React.useState(false);

  const { exitRoom, logoutUser } = props;

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
        <MenuItem
          component={Link}
          to={'/profile'}
          onClick={() => {
            exitRoom();
            handleClose();
          }}
        >
          My profile
        </MenuItem>
        <MenuItem
          component={Link}
          to={'/channels'}
          onClick={() => {
            exitRoom();
            handleClose();
          }}
        >
          My channels
        </MenuItem>
        <MenuItem
          onClick={e => {
            logoutUser();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

function mapStateToProps({ auth, rooms }) {
  return {
    uid: auth.user.uid,
    userName: auth.user.displayName,
    email: auth.user.email,

    room: rooms.room
  };
}

const mapDispatchToProps = {
  exitRoom,
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMenu);
