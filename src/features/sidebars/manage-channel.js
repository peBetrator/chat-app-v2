import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getRoomGroupImg, uploadGroupImg } from '../../actions';

import ProfileImage from '../components/common/profile-image';
import FileUploader from '../components/common/file-uploader';

class ManageChannels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: '',
      img: null,
      imgChanged: false,
    };
  }

  componentDidMount() {
    this.setRoomImg();
  }

  setRoomImg() {
    const { room } = this.props;
    getRoomGroupImg(room).then(url => this.setState({ imgURL: url }));
  }

  onChange = event => {
    this.setState({ img: event.target.files[0], imgChanged: true });
  };

  handleUploadImg = event => {
    event.preventDefault();
    const { img } = this.state;
    const { room, uploadGroupImg } = this.props;

    uploadGroupImg(img, room);
  };

  render() {
    const { room } = this.props;
    const { imgURL, img, imgChanged } = this.state;

    const imageURL = imgChanged ? URL.createObjectURL(img) : imgURL;

    return (
      <div>
        <FileUploader onChange={this.onChange}>
          <ProfileImage imageURI={imageURL} width="100px" height="100px" />
        </FileUploader>
        {imgChanged && (
          <div>
            <button onClick={this.handleUploadImg}>Upload</button>
          </div>
        )}
        <div>{room}</div>
        channel settings here
      </div>
    );
  }
}

const mapDispatchToProps = {
  uploadGroupImg,
};

export default connect(null, mapDispatchToProps)(ManageChannels);
