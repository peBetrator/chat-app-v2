import React, { Component } from 'react';
import './channels-settings.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { makeRoomFavorite } from '../../../actions';

import SVGIcon from '../../components/common/svg';
import Modal from '../../components/common/modal';
import Confirmation from './confirm';

class ChannelsSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuAnchor: null,
      showModal: false,
    };
  }

  handleOpenMenu = event => {
    event.preventDefault();
    this.setState({ menuAnchor: event.currentTarget });
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { room, favorite, uid, makeRoomFavorite } = this.props;
    const { menuAnchor, showModal } = this.state;

    return (
      // TODO create a generic component for Menu dropdown(used in profile-menu.js; channels-setting.js; member-list.js)
      <>
        <div onClick={this.handleOpenMenu}>
          <SVGIcon name="show_more_dots" width={13} />
        </div>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={this.handleHideMenu}
        >
          <MenuItem
            onClick={() => {
              makeRoomFavorite(room, uid);
              this.setState({ menuAnchor: null });
            }}
          >
            {favorite ? 'Un-favorite' : 'Favorite'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.toggleModal();
              this.setState({ menuAnchor: null });
            }}
          >
            Hide channel
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.toggleModal();
              this.setState({ menuAnchor: null });
            }}
          >
            Leave channel
          </MenuItem>
        </Menu>

        {showModal && (
          <Modal>
            <Confirmation room={room} handleClose={this.toggleModal} />
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.user.uid,
    userName: auth.user.displayName,
    email: auth.user.email,
  };
};

const mapDispatchToProps = {
  makeRoomFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsSetting);
