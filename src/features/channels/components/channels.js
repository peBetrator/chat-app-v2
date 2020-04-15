import React, { Component } from 'react';
import './channels.css';

import { connect } from 'react-redux';
import { getRooms } from '../../../actions';

import Room from './room';
import Notification from './notification';
import ProfileMenu from '../../profile-menu/profile-menu';

class Channels extends Component {
  componentDidUpdate(prevProps) {
    const { uid, isAuthenticated, getRooms } = this.props;

    if (uid && prevProps.isAuthenticated !== isAuthenticated) {
      getRooms(uid);
    }
  }

  renderSection = (rooms, title, link) => {
    const href = link || `${title}Submenu`;
    if (!rooms.length)
      return (
        <li>
          <a
            href={'#' + href}
            data-toggle="collapse"
            className="dropdown-toggle"
          >
            {title}
          </a>
          <ul className="collapse list-unstyled show" id={href}>
            <p className="no__rooms">No rooms to display...</p>
          </ul>
        </li>
      );

    return (
      <li>
        <a href={'#' + href} data-toggle="collapse" className="dropdown-toggle">
          {title}
        </a>
        <ul className="collapse list-unstyled show" id={href}>
          {rooms.map((room, i) => (
            <li key={i}>
              <Room roomData={room} />
              {room.room && <Notification roomData={room} />}
            </li>
          ))}
        </ul>
      </li>
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
        <nav id="sidebar">
          <ProfileMenu />
          <h2>There are no rooms to display, please create one</h2>
        </nav>
      );

    if (!loaded)
      return (
        <nav id="sidebar">
          <ProfileMenu />
          <h2>Loading rooms...</h2>
        </nav>
      );

    return (
      <nav id="sidebar">
        <ProfileMenu />
        <ul className="list-unstyled">
          {!!favoriteRooms.length &&
            this.renderSection(favoriteRooms, 'Favorites')}
          {this.renderSection(rooms, 'Channels')}
          {this.renderSection(privateRooms, 'Private Groups', 'privates')}
          {!!dms.length && this.renderSection(dms, 'DMs')}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
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
  getRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
