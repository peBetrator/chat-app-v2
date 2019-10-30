import React from 'react';

import { connect } from 'react-redux';

function UserRights(props) {
  return (
    <div>
      <div>Moderator: </div>
    </div>
  );
}

const mapStateToProps = ({ rooms }) => {
  return {
    room: rooms.room
  };
};

export default connect(mapStateToProps)(UserRights);
