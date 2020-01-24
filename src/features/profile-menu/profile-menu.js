import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../components/header/app-header.css';

import ChangeUserName from './change-user-name';
import SVGIcon from '../components/common/svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { exitRoom, logoutUser } from '../../actions';

function ProfileMenu(props) {
  const userName = props.userName || props.email;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input, setInput] = React.useState(false);

  const { exitRoom, logoutUser } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    exitRoom();
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
        <div className="app__profile" onClick={handleClick}>
          {userName}
          <SVGIcon className="profile__icon" name="profile" width={13} />
        </div>
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleChangeUserName}>Change display name</MenuItem>
        <MenuItem component={Link} to={'/profile'} onClick={handleClose}>
          My profile
        </MenuItem>
        <MenuItem component={Link} to={'/channels'} onClick={handleClose}>
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
    userName: auth.user.displayName,
    email: auth.user.email,

    room: rooms.room,
  };
}

const mapDispatchToProps = {
  exitRoom,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
