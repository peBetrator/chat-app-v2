import React, { Component } from 'react';
import firebase from 'firebase';

import Form from '../form/Form.js';
import firebaseConfig from '../../config';
import './App.css';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleLogOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut}
            >
              Logout
            </button>
          )}
        </div>
        <div className="app__list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}
export default App;