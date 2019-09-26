import React from 'react';
import './app.css';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from '../protected_route';
import Header from '../header/app-header';
import Login from '../pages/login/login-page';
import Chat from '../pages/home/chat-page';
import Profile from '../pages/manage-profile/profile';
import Channels from '../pages/manage-channels/channels-table';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
        <ProtectedRoute
          exact
          path='/'
          component={Chat}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <ProtectedRoute
          exact
          path='/profile'
          component={Profile}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          exact
          path='/channels'
          component={Channels}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
