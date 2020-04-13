import React, { Component } from 'react';
import './sidebars.css';

import { connect } from 'react-redux';
import { getRoomGroupImg, uploadGroupImg } from '../../actions';

import ProfileImage from '../components/common/profile-image';
import FileUploader from '../components/common/file-uploader';
import Modal from '../components/common/modal';
import AddUserForm from '../../pages/manage-channels/add-user';

class ManageChannels extends Component {
  state = {
    imgURL: '',
    img: null,
    imgChanged: false,
    showModal: false,
  };

  componentDidMount() {
    this.setRoomImg();
  }

  setRoomImg() {
    const { room } = this.props;
    getRoomGroupImg(room).then(url => this.setState({ imgURL: url }));
  }

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

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
    const { imgURL, img, imgChanged, showModal } = this.state;

    const imageURL = imgChanged ? URL.createObjectURL(img) : imgURL;

    return (
      <div className="align__center">
        <FileUploader onChange={this.onChange}>
          <ProfileImage imageURI={imageURL} width="100px" height="100px" />
        </FileUploader>
        {imgChanged && (
          <div>
            <button onClick={this.handleUploadImg}>Upload</button>
          </div>
        )}
        <div>{room}</div>
        <div>
          <button onClick={this.toggleModal}>Add User</button>
        </div>

        {showModal && (
          <Modal>
            <AddUserForm room={room} handleClose={this.toggleModal} />
          </Modal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  uploadGroupImg,
};

export default connect(null, mapDispatchToProps)(ManageChannels);
