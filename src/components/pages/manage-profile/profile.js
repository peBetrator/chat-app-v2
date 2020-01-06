import React from 'react';
import './manage-profile.css';

import ProfileImage from '../../common/profile-image';

import { connect } from 'react-redux';
import { changeName, changeProfileImg } from '../../../actions';

function Profile(props) {
  const { userName, uid, photoURI } = props;

  const [name, setName] = React.useState(userName);
  const [profileImg, setProfileImg] = React.useState();
  const [isEdit, setEdit] = React.useState(false);

  const handleSubmit = e => {
    const { handleNameChange, handleProfileImgChange } = props;

    if (isEdit) {
      handleNameChange(name);
      if (profileImg) {
        // TODO: add validations on client side
        handleProfileImgChange(profileImg);
      }
    }
    setEdit(!isEdit);

    e.preventDefault();
  };

  const updateProfileImg = e => {
    setProfileImg(e.target.files[0]);
  };

  return (
    // TODO create generic input for profile settings
    <form className="profile__table">
      <label>User Name: </label>
      <input
        type="text"
        value={name || ''}
        placeholder="please set your nickname"
        onChange={e => setName(e.target.value)}
        disabled={!isEdit}
      />
      <span className="separator" />
      <label>UID: </label>
      <input type="text" value={uid} disabled />
      <span className="separator" />
      <ProfileImage imageURI={photoURI} />
      <span className="separator" />
      <input type="file" disabled={!isEdit} onChange={updateProfileImg} />
      <span className="separator" />
      <button onClick={handleSubmit}>{isEdit ? 'Save' : 'Edit profile'}</button>
    </form>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    userName: auth.user.displayName,
    uid: auth.user.uid,
    photoURI: auth.user.photoURL,
  };
};

const mapDispatchToProps = {
  handleNameChange: changeName,
  handleProfileImgChange: changeProfileImg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
