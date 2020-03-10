import React, { Component } from 'react';
import './message.css';

import { connect } from 'react-redux';
import { getProfilePicUrl } from '../../../actions';

import ProfileImage from '../../components/common/profile-image';
import FilePreview from './file-preview';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileImg: '',
    };
  }

  componentDidMount() {
    const { uid } = this.props.message;
    getProfilePicUrl(uid).then(url => this.setState({ profileImg: url }));
  }

  componentDidUpdate({ message }) {
    const { uid } = this.props.message;
    if (uid && message.uid !== uid) {
      this.setProfileImg();
    }
  }

  render() {
    const { profileImg } = this.state;
    const stateUID = this.props.uid;
    const { uid, name, message, timestamp, file } = this.props.message;
    const time = new Date(timestamp).toLocaleTimeString();

    return (
      <div className={`message ${stateUID === uid ? 'me' : 'other'}`}>
        <ProfileImage imageURI={profileImg} />
        <span className="message__author">
          {name} ({time}):
        </span>
        {file && file.url ? <FilePreview file={file} /> : message}
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
