import React from 'react';
import './app.css';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from '../protected_route';
import Login from '../pages/login-page';
import Chat from '../pages/chat-page';
import Header from '../header/app-header';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <div className='app'>
      <Header />
      <Switch>
        <ProtectedRoute
          exact
          path='/'
          component={Chat}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path='/login' component={Login} />
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
