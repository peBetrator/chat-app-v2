import React, { useEffect, useState } from 'react';
import './sidebars.css';

import { connect } from 'react-redux';
import { createDM, getProfilePicUrl } from '../../actions';
import { buildRoomTitle } from '../../features/utils';

import UserRights from './user-rights';
import ProfileImage from '../components/common/profile-image';

function UserProfile(props) {
  const [profileImg, setProfileImg] = useState('');
  const { uid } = props;

  useEffect(() => {
    const controller = new AbortController();
    getProfilePicUrl(uid).then(url => setProfileImg(url));

    return () => {
      controller.abort();
    };
  }, []);

  const handleDM = () => {
    const { myUID, createDM } = props;

    const uids = {
      uid: myUID,
      dmuid: uid,
    };
    const room = buildRoomTitle(uids.uid, uids.dmuid);

    createDM(room, uids);
  };

  return (
    <div>
      <ProfileImage imageURI={profileImg} width="100px" height="100px" />
      <button className="dm" onClick={handleDM}>
        direct message
      </button>
      <UserRights uid={uid} />
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    myUID: auth.user.uid,
  };
};

const mapDispatchToProps = {
  createDM,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
