import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeRoom, getRooms } from '../../actions';

import './channels.css';

class Channels extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.props.handleGetRooms(this.props.uid);
    }
  }

  handleChannelChange = e => {
    const { handleRoomChange } = this.props;
    const room = e.currentTarget.getAttribute('value');

    handleRoomChange(room);
  };

  render() {
    const { curRoom, rooms, loaded, isAuthenticated } = this.props;
    if (!isAuthenticated)
      return (
        <ul id='ul_top_hypers'>
          <li>Please authenticate</li>
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
          <li
            key={i}
            className={curRoom === room ? 'selected' : ''}
            value={room}
            onClick={this.handleChannelChange}
          >
            {room}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ auth, messaging }) => {
  return {
    curRoom: messaging.room,
    rooms: messaging.rooms,
    loaded: messaging.loadedRooms,

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
