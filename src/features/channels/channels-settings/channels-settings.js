import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './channels-settings.css';

import Confirmation from './confirm';
import SVGIcon from '../../components/common/svg';
import Modal from '../../components/common/modal';
import { connect } from 'react-redux';

function ChannelsSetting(props) {
  const { room } = props;
  const [anchorSettings, setAnchorSetting] = React.useState(null);
  const [confirmation, setConfirmation] = React.useState(false);

  const handleClick = event => {
    event.preventDefault();
    setAnchorSetting(event.currentTarget);
  };

  const handleClose = () => {
    setConfirmation(false);
  };

  return (
    // TODO create a generic component for Menu dropdown(used in profile-menu.js; channels-setting.js; member-list.js)
    <>
      <div onClick={handleClick}>
        <SVGIcon name="show_more_dots" width={13} />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorSettings}
        keepMounted
        open={Boolean(anchorSettings)}
        onClose={() => {
          setAnchorSetting(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setConfirmation(true);
            setAnchorSetting(null);
          }}
        >
          Leave chat
        </MenuItem>
      </Menu>

      {/*// TODO do smth with passing the same method to modal and component itself*/}
      <Modal show={confirmation} handleClose={handleClose}>
        <Confirmation room={room} handleClose={handleClose} />
      </Modal>
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    userName: auth.user.displayName,
    email: auth.user.email,
  };
};

export default connect(mapStateToProps)(ChannelsSetting);
