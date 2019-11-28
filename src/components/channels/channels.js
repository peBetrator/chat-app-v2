import React, { Component } from 'react';
import './channels.css';

import ProfileMenu from '../header/profile-menu/profile-menu';
import ChannelsSetting from './channels-settings/channels-settings';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeRoom, getRooms } from '../../actions';
import { formatDMTitle } from '../utils';

class Channels extends Component {
  componentDidUpdate(prevProps) {
    const { uid, isAuthenticated, getRooms } = this.props;

    if (uid && prevProps.isAuthenticated !== isAuthenticated) {
      getRooms(uid);
    }
  }

  handleChannelChange = e => {
    const { handleRoomChange } = this.props;
    const room = e.currentTarget.getAttribute('value');

    handleRoomChange(room);
  };

  renderSection = rooms => {
    const { curRoom, userName } = this.props;

    if (!rooms.length) return <p>No rooms to display...</p>;

    return (
      <>
        {rooms.map(({ room, DM }, i) => (
          <Link style={{ textDecoration: 'none' }} to="/">
            <li
              className={curRoom === room ? 'active' : ''}
              onClick={this.handleChannelChange}
              value={room}
              key={i}
            >
              {!DM ? room : formatDMTitle(room, userName)}
              <ChannelsSetting room={room} />
            </li>
          </Link>
        ))}
      </>
    );
  };

  render() {
    const {
      rooms,
      dms,
      privateRooms,
      favoriteRooms,
      loaded,
      noRooms,
      isAuthenticated,
    } = this.props;

    // TODO extract auth state from channels component
    if (!isAuthenticated) return null;

    if (noRooms)
      return (
        <ul className="sidebar">
          <ProfileMenu />
          <h2>There are no rooms to display, please create one</h2>
        </ul>
      );

    if (!loaded)
      return (
        <ul className="sidebar">
          <ProfileMenu />
          <h2>Loading rooms...</h2>
        </ul>
      );

    return (
      <ul className="sidebar">
        <ProfileMenu />
        {!!favoriteRooms.length && (
          <div>
            <div className="section">Favorite</div>
            {this.renderSection(favoriteRooms)}
          </div>
        )}
        <div className="section">Channels</div>
        {this.renderSection(rooms)}
        <div className="section">Private Groups</div>
        {this.renderSection(privateRooms)}

        {!!dms.length && (
          <div>
            <div className="section">Direct Messages</div>
            {this.renderSection(dms)}
          </div>
        )}
      </ul>
    );
  }
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    curRoom: rooms.room,
    rooms: rooms.rooms,
    dms: rooms.dms,
    privateRooms: rooms.privateRooms,
    favoriteRooms: rooms.favoriteRooms,
    loaded: rooms.loadedRooms,
    noRooms: rooms.noRooms,

    isAuthenticated: auth.isAuthenticated,
    uid: auth.user.uid,
    userName: auth.user.displayName,
  };
};

const mapDispatchToProps = {
  handleRoomChange: changeRoom,
  getRooms,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
