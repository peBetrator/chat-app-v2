import React, { Component } from 'react';
import './channels-settings.css';

import { connect } from 'react-redux';
import { makeRoomFavorite } from '../../../actions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Modal from '../../components/common/modal';
import Sidebar from '../../components/common/sidebar';
import SVGIcon from '../../components/common/svg';
import ManageChannels from '../../sidebars/manage-channel';
import Confirmation from './confirm';

class ChannelsSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuAnchor: null,
      showModal: false,
      showSidebar: false,
    };
  }

  handleOpenMenu = event => {
    event.preventDefault();
    this.setState({ menuAnchor: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ menuAnchor: null });
  };

  handleChangeRoomFavorite = () => {
    const { room, uid, makeRoomFavorite } = this.props;

    makeRoomFavorite(room, uid);
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  toggleSidebar = event => {
    event.preventDefault();
    this.setState(state => ({ showSidebar: !state.showSidebar }));
  };

  render() {
    const { room, favorite } = this.props;
    const { menuAnchor, showModal, showSidebar } = this.state;

    return (
      // TODO create a generic component for Menu dropdown(used in profile-menu.js; channels-setting.js; member-list.js)
      <div>
        <div onClick={this.handleOpenMenu}>
          <SVGIcon name="show_more_dots" width={13} />
        </div>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClick={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleChangeRoomFavorite}>
            {favorite ? 'Un-favorite' : 'Favorite'}
          </MenuItem>
          <MenuItem onClick={this.toggleSidebar}>Manage channel</MenuItem>
          <MenuItem onClick={this.toggleModal}>Hide channel</MenuItem>
          <MenuItem onClick={this.toggleModal}>Leave channel</MenuItem>
        </Menu>

        {showSidebar && (
          <Sidebar>
            <ManageChannels room={room} handleClose={this.toggleSidebar} />
          </Sidebar>
        )}
        {showModal && (
          <Modal>
            <Confirmation room={room} handleClose={this.toggleModal} />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.user.uid,
  };
};

const mapDispatchToProps = {
  makeRoomFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsSetting);
