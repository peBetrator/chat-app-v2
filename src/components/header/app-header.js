import React from 'react';
import './app-header.css';

import Channels from '../channels/channels';
import ProfileMenu from './profile-menu/profile';
import { connect } from 'react-redux';

function Header(props) {
  const { isAuthenticated } = props;

  return (
    <div>
      {!isAuthenticated ? (
        // TODO make a generic component for button
        <button className='app__button'>Sign in</button>
      ) : (
        <ProfileMenu />
      )}
      <Channels />
    </div>
  );
}

function mapStateToProps({ auth, messaging }) {
  return {
    isLoggingOut: auth.isLoggingOut,
    logoutError: auth.logoutError,
    isAuthenticated: auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Header);
