// TODO convert component to function
import React, { Component } from "react";

import "./channels.css";

import firebase from "firebase";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.channelsRef = firebase.database().ref("rooms");
    this.listenRooms();
  }

  listenRooms() {
    this.channelsRef.on("child_added", courseSnapshot => {
      this.setState({
        list: [...this.state.list, courseSnapshot.key]
      });
    });
  }

  handleChannelChange = e => {
    this.props.onSelectRoom(e.currentTarget.getAttribute('value'));
  };

  render() {
    return (
      <ul id="ul_top_hypers">
        {this.state.list.map((room, i) => (
          <li key={i} value={room} onClick={e => this.handleChannelChange(e)}>
            {room}
          </li>
        ))}
      </ul>
    );
  }
}

export default Channels;
