import React, { Component } from 'react';
import './message.css';

import { connect } from 'react-redux';
import { getProfilePicUrl } from '../../actions';

import ProfileImage from '../common/profile-image';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileImg: '',
    };
  }

  componentDidMount() {
    this.setProfileImg();
  }

  componentDidUpdate({ message }) {
    const { uid } = this.props.message;
    if (uid && message.uid !== uid) {
      this.setProfileImg();
    }
  }

  setProfileImg() {
    const { uid } = this.props.message;
    getProfilePicUrl(uid).then(url => this.setState({ profileImg: url }));
  }

  render() {
    const { profileImg } = this.state;
    const stateUID = this.props.uid;
    const { uid, name, message, timestamp } = this.props.message;
    const time = new Date(timestamp).toLocaleTimeString();

    return (
      <div className={`message ${stateUID === uid ? 'me' : 'other'}`}>
        <ProfileImage imageURI={profileImg} />
        <span className="message__author">
          {name} ({time}):
        </span>
        {message}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    uid: auth.user.uid,
  };
}

export default connect(mapStateToProps)(Message);
