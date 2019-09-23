import React from 'react';
import './message.css';

import { connect } from 'react-redux';

function Message(props) {
  const stateUID = props.uid;
  return (
    <div className={`message ${stateUID === props.message.uid ? 'me' : 'other'}`}>
      <span className="message__author">
        {props.message.userName}:
      </span>
      {props.message.message}
    </div>
  );
}

function mapStateToProps({ auth }) {
  return {
    uid: auth.user.uid
  };
}

export default connect(mapStateToProps)(Message);
