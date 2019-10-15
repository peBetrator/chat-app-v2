import React from 'react';
import './message.css';

import { connect } from 'react-redux';

function Message(props) {
  const stateUID = props.uid;
  const { uid, name, message, timestamp } = props.message;
  const time = new Date(timestamp).toLocaleTimeString();

  return (
    <div className={`message ${stateUID === uid ? 'me' : 'other'}`}>
      <span className='message__author'>
        {name} ({time}):
      </span>
      {message}
    </div>
  );
}

function mapStateToProps({ auth }) {
  return {
    uid: auth.user.uid
  };
}

export default connect(mapStateToProps)(Message);
