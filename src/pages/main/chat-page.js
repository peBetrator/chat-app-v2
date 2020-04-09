import React from 'react';
import './chat.css';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from '../../routing';

// import Login from '../login/login-page';
import Login from '../login/Login';
import Singup from '../login/Singup';
import Profile from '../manage-profile/profile';
import ChannelsTable from '../manage-channels/channels-table';

import Form from '../../features/messages/form/Form';
import Members from '../../features/members/members';

function MainChat(props) {
  const { isAuthenticated, isVerifying } = props;

  return (
    <Switch>
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Singup} />
      <ProtectedRoute
        exact
        path="/"
        component={Chat}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/profile"
        component={Profile}
        isAuthenticated={isAuthenticated}
      />
      <ProtectedRoute
        exact
        path="/channels"
        component={ChannelsTable}
        isAuthenticated={isAuthenticated}
      />
    </Switch>
  );
}

function Chat() {
  return (
    <div className="chat">
      <Form />
      <Members />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}

export default connect(mapStateToProps)(MainChat);
