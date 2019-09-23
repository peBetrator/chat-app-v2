import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../app-header.css';

import ChangeUserName from './change-user-name';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions';

function ProfileMenu(props) {
  const userName = props.userName || props.email;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input, setInput] = React.useState(false);

  const handleLogOut = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  };

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
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

function mapStateToProps({ auth, messaging }) {
  return {
    userName: auth.user.displayName,
    email: auth.user.email
  };
}

export default connect(mapStateToProps)(ProfileMenu);
