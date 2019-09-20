import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import './app-header.css';

import Channels from '../channels/channels.js';

class Header extends Component {
  handleLogOut = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { isAuthenticated, isLoggingOut, logoutError } = this.props;
    return (
      <div className='app__header'>
        {!isAuthenticated ? (
          <button className='app__button'>Sign in</button>
        ) : (
          <button className='app__button' onClick={this.handleLogOut}>
            Logout
          </button>
        )}
        <Channels />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Header);
