import React, { useEffect } from 'react';
import './members.css';

import { connect } from 'react-redux';

function MemberData(props) {
  const [isHidden, setIsHidden] = React.useState(true);

  return (
    <div>
      <div
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        {props.member}
      </div>
      <div className={isHidden ? 'hide' : 'display'}>
        <ul>
          <li>Set rights</li>
          <li>Remove</li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = ({ rooms }) => {
  return {
    members: rooms.members,
    loadedMembers: rooms.loadedMembers,
    room: rooms.room
  };
};

export default connect(mapStateToProps)(MemberData);
