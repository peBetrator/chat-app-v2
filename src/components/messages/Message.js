// TODO convert component to function
import React, { Component } from 'react';
import './message.css';

class Message extends Component {
  render() {
    return (
      <div className='message'>
        <span className='message__author'>{this.props.message.userName}:</span>
        {this.props.message.message}
      </div>
    );
  }
}

export default Message;
