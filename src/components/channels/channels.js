import React, { Component } from 'react';
import './channels.css';

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

  render() {
    const { curRoom, rooms, loaded, noRooms, isAuthenticated } = this.props;
    if (!isAuthenticated)
      return (
        <ul id='ul_top_hypers'>
          <li>Please authenticate</li>
        </ul>
      );

    if (noRooms)
      return (
        <ul id='ul_top_hypers'>
          <li>There are no rooms to display, please create one</li>
        </ul>
      );

    if (!loaded)
      return (
        <ul id='ul_top_hypers'>
          <li>Loading chat rooms...</li>
        </ul>
      );

    return (
      <ul id='ul_top_hypers'>
        {rooms.map(({ room }, i) => (
          <li className={curRoom === room ? 'selected' : ''} key={i}>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to='/'
              value={room}
              onClick={this.handleChannelChange}
            >
              {room}
            </Link>
            <ChannelsSetting room={room} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    curRoom: rooms.room,
    rooms: rooms.rooms,
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
