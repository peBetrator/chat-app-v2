import React, { Component } from 'react';
import './channels.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeRoom, getRooms } from '../../actions';

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
          <Link style={{ color: 'black' }} to='/' key={i}>
            <li
              className={curRoom === room ? 'selected' : ''}
              value={room}
              onClick={this.handleChannelChange}
            >
              {room}
            </li>
          </Link>
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
