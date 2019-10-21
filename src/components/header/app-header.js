import React from 'react';
import './app-header.css';

import ProfileMenu from './profile-menu/profile-menu';
import { connect } from 'react-redux';

function Header(props) {
  const { isAuthenticated } = props;

  return (
    <div className="app__header">
      {isAuthenticated && <ProfileMenu />}
    </div>
  );
}

function mapStateToProps({ auth }) {
  return {
    isLoggingOut: auth.isLoggingOut,
    logoutError: auth.logoutError,
    isAuthenticated: auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Header);
