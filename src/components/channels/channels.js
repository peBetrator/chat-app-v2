import React, { Component } from 'react';
import './channels.css';

import ProfileMenu from '../header/profile-menu/profile-menu';
import ChannelsSetting from './channels-settings/channels-settings';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeRoom, getRooms } from '../../actions';

class Channels extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.uid &&
      prevProps.isAuthenticated !== this.props.isAuthenticated
    ) {
      this.props.handleGetRooms(this.props.uid);
    }
  }

  handleChannelChange = e => {
    const { handleRoomChange } = this.props;
    const room = e.currentTarget.getAttribute('value');

    handleRoomChange(room);
  };

  renderSection = rooms => {
    if (!rooms.length) return <p>No rooms to display...</p>;

    return (
      <>
        {rooms.map(({ room, admin }, i) => (
          <Link style={{ textDecoration: 'none' }} to='/'>
            <li
              className={this.props.curRoom === room ? 'active' : ''}
              onClick={this.handleChannelChange}
              value={room}
              key={i}
            >
              {room}
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
      privateRooms,
      loaded,
      noRooms,
      isAuthenticated
    } = this.props;
    if (!isAuthenticated) return null;

    // TODO add SASS / clean up css / style
    if (noRooms)
      return (
        <ul className='sidebar'>
          <ProfileMenu />
          <h2>There are no rooms to display, please create one</h2>
        </ul>
      );

    if (!loaded)
      return (
        <ul className='sidebar'>
          <ProfileMenu />
          <h2>Loading rooms...</h2>
        </ul>
      );

    return (
      // <ul id='ul_top_hypers'>
      <ul className='sidebar'>
        <ProfileMenu />
        <div className='section'>Channels</div>
        {this.renderSection(rooms)}
        <div className='section'>Private Groups</div>
        {this.renderSection(privateRooms)}
      </ul>
    );
  }
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    curRoom: rooms.room,
    rooms: rooms.rooms,
    privateRooms: rooms.privateRooms,
    loaded: rooms.loadedRooms,
    noRooms: rooms.noRooms,

    isAuthenticated: auth.isAuthenticated,
    uid: auth.user.uid
  };
};

const mapDispatchToProps = {
  handleRoomChange: changeRoom,
  handleGetRooms: getRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
