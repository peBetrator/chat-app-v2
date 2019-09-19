// TODO convert component to function
import React, { Component } from "react";
import { connect } from "react-redux";
import { getRooms } from "../../actions";

import { changeRoom } from "../../actions";

import "./channels.css";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    // this.channelsRef = firebase.database().ref("rooms");
    this.listenRooms();
  }

  listenRooms() {
    const { dispatch } = this.props;
    dispatch(getRooms());
  }

  // handleChannelChange = e => {
  //   this.props.onSelectRoom(e.currentTarget.getAttribute('value'));
  // };

  render() {
    const { rooms } = this.props;
    return (
      <ul id="ul_top_hypers">
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
    rooms: state.messaging.rooms
  };
};

// const mapDispatchToProps = {
//   handleRoomChange: changeRoom
// };

export default connect(mapStateToProps)(Channels);
