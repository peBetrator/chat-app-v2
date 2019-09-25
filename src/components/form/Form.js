import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, sendMessage } from '../../actions';

import './form.css';

import Message from '../messages/message';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.listenMessages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.room !== this.props.room) {
      this.listenMessages();
    }
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSend = () => {
    const { dispatch, room, userName, email, uid } = this.props;
    const messageObject = {
      user: userName || email,
      message: this.state.message,
      room,
      uid
    };
    dispatch(sendMessage(messageObject));
    this.setState({ message: '' });
    this.listenMessages();
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') this.handleSend();
  };

  listenMessages = () => {
    const { dispatch, room } = this.props;
    dispatch(getMessages(room));
  };

  render() {
    const { loaded, messages } = this.props;
    return (
      <div className='form'>
        <div className='form__message'>
          {messages.map((item, index) => (
            <Message key={index} message={item} />
          ))}
        </div>
        <div className='form__row'>
          <input
            className='form__input'
            type='text'
            placeholder='Type message'
            value={this.state.message}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <button className='form__button' onClick={this.handleSend}>
            send
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, messaging, rooms }) => {
  return {
    userName: auth.user.displayName,
    email: auth.user.email,
    uid: auth.user.uid,

    room: rooms.room,
    messages: messaging.messages,
    loaded: messaging.loaded
  };
};

export default connect(mapStateToProps)(Form);
