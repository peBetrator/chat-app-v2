import React from 'react';
import './sidebar.css';

import { connect } from 'react-redux';
import { createDM } from '../../actions';
import { buildRoomTitle } from '../utils';

function UserProfile(props) {
  const { myUID, uid, createDM } = props;
  const handleDM = () => {
    const uids = {
      uid: myUID,
      dmuid: uid,
    };
    const room = buildRoomTitle(uids.uid, uids.dmuid);

    createDM(room, uids);
  };

  return (
    <div>
      <div className="dm" onClick={handleDM}>
        direct message
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    myName: auth.user.displayName,
    myEmail: auth.user.email,
    myUID: auth.user.uid,
  };
};

const mapDispatchToProps = {
  createDM,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
