import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './channels-settings.css';

import MemberList from './member-list';
import { connect } from 'react-redux';
import { leaveChat } from '../../../actions';

function ChannelsSetting(props) {
  const { room, uid, leaveChat } = props;
  const [anchorSettings, setAnchorSetting] = React.useState(null);

  const handleClick = event => {
    setAnchorSetting(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorSetting(null);
  };

  return (
    // TODO create a generic component for Menu dropdown(used in profile-menu.js; channels-setting.js; member-list.js)
    <div>
      <span role='img' aria-label='settings' onClick={handleClick}>
        ⚙️
      </span>
      <Menu
        id='simple-menu'
        anchorEl={anchorSettings}
        keepMounted
        open={Boolean(anchorSettings)}
        onClose={handleClose}
      >
        <MenuItem>
          <MemberList room={room} handleClose={handleClose} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            leaveChat(room, uid);
          }}
        >
          Leave chat
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    uid: auth.user.uid,
    userName: auth.user.displayName,
    email: auth.user.email
  };
};

const mapDispatchToProps = {
  leaveChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsSetting);
