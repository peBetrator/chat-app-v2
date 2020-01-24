import React, { useEffect, useState } from 'react';
import { handleUserRights } from '../../actions';

import { connect } from 'react-redux';
import { getUserRights } from '../../actions';

function UserRights(props) {
  const [isModerator, setModerator] = useState(false);
  const { room, uid } = props;

  useEffect(() => {
    getUserRights(room, uid).then(right => setModerator(right));
  }, [uid]);

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
