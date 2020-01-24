import React, { Component } from 'react';
import './channels.css';

import { connect } from 'react-redux';
import { getRooms } from '../../../actions';

import Room from './room';
import ProfileMenu from '../../profile-menu/profile-menu';

class Channels extends Component {
  componentDidUpdate(prevProps) {
    const { uid, isAuthenticated, getRooms } = this.props;

    if (uid && prevProps.isAuthenticated !== isAuthenticated) {
      getRooms(uid);
    }
  }

  renderSection = rooms => {
    if (!rooms.length) return <p>No rooms to display...</p>;

    return (
      <>
        {rooms.map((room, i) => (
          <Room roomData={room} key={i} />
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
