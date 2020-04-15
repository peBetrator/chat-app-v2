import React, { Component } from 'react';
import './message.css';

import { connect } from 'react-redux';
import { getProfilePicUrl } from '../../../actions';

import ProfileImage from '../../components/common/profile-image';
import FilePreview from './file-preview';

import { formatTime } from '../../utils';

class Message extends Component {
  state = {
    isCurrentUser: true,
    profileImg: '',
  };

  componentDidMount() {
    const { uid } = this.props.message;
    const stateUID = this.props.uid;
    if (stateUID !== uid) {
      getProfilePicUrl(uid).then(url =>
        this.setState({ isCurrentUser: false, profileImg: url })
      );
    }
  }

  componentDidUpdate({ message }) {
    const { uid } = this.props.message;
    if (uid && message.uid !== uid) {
      // this.setProfileImg();
    }
  }

  render() {
    const { isCurrentUser, profileImg } = this.state;
    const {
      showProfilePic,
      message: { name, message, timestamp, file },
    } = this.props;
    const time = formatTime(timestamp);

    return (
      <>
        {!isCurrentUser && showProfilePic && (
          <div className="chat__profile">
            <ProfileImage imageURI={profileImg} />
            {name}
          </div>
        )}
        <div className={`chat__bubble ${isCurrentUser && 'current__user'}`}>
          {file && file.url ? <FilePreview file={file} /> : message}
          <br />
          <span className="chat__time">({time})</span>
        </div>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    uid: auth.user.uid,
  };
}

export default connect(mapStateToProps)(Message);
