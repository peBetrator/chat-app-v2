import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRooms } from '../../actions';

import { changeRoom } from '../../actions';

import './channels.css';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: this.props.rooms
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.listenRooms();
    }
  }

  listenRooms() {
    const { dispatch } = this.props;
    dispatch(getRooms());
  }

  handleChannelChange = e => {
    const { dispatch } = this.props;
    const room = e.currentTarget.getAttribute('value');

    dispatch(changeRoom(room));
  };

  render() {
    const { rooms, loaded, isAuthenticated } = this.props;
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
        {rooms.map((room, i) => (
          <li key={i} value={room} onClick={this.handleChannelChange}>
            {room}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ auth, messaging }) => {
  return {
    rooms: messaging.rooms,
    loaded: messaging.loadedRooms,

    isAuthenticated: auth.isAuthenticated
  };
};

// TODO use mapDispatchToProps
// const mapDispatchToProps = {
//   handleRoomChange: changeRoom
// };

export default connect(mapStateToProps)(Channels);
