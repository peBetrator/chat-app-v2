import React, { useEffect, useState } from 'react';
import { handleUserRights } from '../../actions';
import { myFirebase } from '../../firebase/firebase';

import { connect } from 'react-redux';

function UserRights(props) {
  const [isModerator, setModerator] = useState(false);
  const { room, uid } = props;

  useEffect(() => {
    getUserRights();
  }, []);

  const getUserRights = () => {
    const roomRef = myFirebase
      .database()
      .ref(`room-metadata/${room}/moderators/${uid}`);

    roomRef.once('value').then(roomSnapshot => {
      if (roomSnapshot.exists()) {
        setModerator(true);
      } else setModerator(false);
    });
  };

  const handleRightSelect = () => {
    const { handleUserRights } = props;

    handleUserRights(room, uid);
    setModerator(!isModerator);
  };

  return (
    <div>
      Set right to 
      <button onClick={handleRightSelect}>
        {isModerator ? 'simple user' : 'moderator'}
      </button>
    </div>
  );
}

const mapStateToProps = ({ rooms }) => {
  return {
    room: rooms.room,
  };
};

const mapDispatchToProps = {
  handleUserRights,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRights);
