// TODO convert component to function
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
    // this.channelsRef = firebase.database().ref("rooms");
    this.listenRooms();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.rooms && prevState.rooms !== nextProps.rooms) {
  //     return { rooms: nextProps.rooms };
  //   }
  //   return null;
  // }

  listenRooms() {
    const { dispatch } = this.props;
    dispatch(getRooms());
  }

  // handleChannelChange = e => {
  //   this.props.onSelectRoom(e.currentTarget.getAttribute('value'));
  // };

  render() {
    const { rooms, loaded } = this.props;
    console.log('rooms ', rooms);
    if (!loaded) {
      return <p>Loading...</p>;
    }
    return (
      <ul id='ul_top_hypers'>
        {rooms.map((room, i) => (
          <li key={i} value={room}>
            {room}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.messaging.rooms,
    loaded: state.messaging.loadedRooms
  };
};

// const mapDispatchToProps = {
//   handleRoomChange: changeRoom
// };

export default connect(mapStateToProps)(Channels);
