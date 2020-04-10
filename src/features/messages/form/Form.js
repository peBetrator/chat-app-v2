import React, { Component } from 'react';
import './form.css';

import { connect } from 'react-redux';
import { getMessages, sendMessage, sendFileMessage } from '../../../actions';

import Message from '../../messages/components/message';
import SVGIcon from '../../components/common/svg';
import FileUploader from '../../components/common/file-uploader';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      file: null,
      metadata: {},
    };

    this.listenMessages();
  }

  componentDidUpdate(prevProps) {
    const { room } = this.props;

    if (prevProps.room !== room) {
      this.listenMessages();
    }
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSendMessage = () => {
    const {
      room,
      userName,
      email,
      uid,
      sendMessage,
      sendFileMessage,
    } = this.props;
    const { message, file, metadata } = this.state;
    if (!message && !file) {
      return;
    }

    const payload = {
      user: userName || email,
      room,
      uid,
      message,
    };

    sendMessage(payload);

    if (file) {
      const { message, ...newObject } = payload;
      Object.assign(newObject, { file, metadata });
      sendFileMessage(payload);
    }

    this.setState({
      message: '',
      file: null,
      metadata: {},
    });
    this.listenMessages();
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') this.handleSendMessage();
  };

  handleImageSelect = event => {
    const file = event.target.files[0];

    this.setState({ file, metadata: { contentType: file.type } });
  };

  listenMessages = () => {
    const { getMessages, room } = this.props;
    getMessages(room);
  };

  renderMessages = messages => {
    let userUID = '';
    return messages.map((item, index) => {
      let show = false;
      if (userUID !== item.uid) {
        show = true;
        userUID = item.uid;
      }
      return <Message key={index} message={item} showProfilePic={show} />;
    });
  };

  render() {
    const { messages, loaded } = this.props;
    return (
      <div className="form">
        {loaded && this.renderMessages(messages)}
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <div className="form__add" title="Send file">
            <FileUploader onChange={this.handleImageSelect}>
              <SVGIcon
                className="icon"
                name="add"
                width="25px"
                fill="rgba(28, 18, 167, 0.836)"
              />
            </FileUploader>
          </div>
          <button className="form__button" onClick={this.handleSendMessage}>
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
    loaded: messaging.loaded,
  };
};

const mapDispatchToProps = {
  getMessages,
  sendMessage,
  sendFileMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
