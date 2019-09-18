import React, { Component } from "react";
import firebase from "firebase";
import firebaseConfig from "../../config";

import Form from "../form/form.js";
import Channels from "../channels/channels.js";

import "./app.css";

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      room: "global"
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  handleLogOut = () => {
    firebase.auth().signOut();
  };

  handleRoomChange = room => {
    this.setState({
      room
    });
  };

  render() {
    // TODO divide to components
    return (
      <div className="app">
        <div className="app__header">
          {!this.state.user ? (
            <button className="app__button" onClick={this.handleSignIn}>
              Sign in
            </button>
          ) : (
            <button className="app__button" onClick={this.handleLogOut}>
              Logout
            </button>
          )}
          <Channels onSelectRoom={this.handleRoomChange} />
        </div>
        <div className="app__list">
          <Form user={this.state.user} room={this.state.room} />
        </div>
      </div>
    );
  }
}
export default App;
