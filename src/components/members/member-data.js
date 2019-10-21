import React, { useEffect } from 'react';
import './members.css';

import Modal from '../common/modal';
import { connect } from 'react-redux';

function MemberData(props) {
  const [isHidden, setIsHidden] = React.useState(true);
  const [showUserRights, setShowRights] = React.useState(false);

  const handleClose = () => {
    setShowRights(false);
  };

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
          <li>View profile</li>
          <li
            className={!props.view ? 'hide' : ''}
            onClick={() => {
              setShowRights(true);
            }}
          >
            Set rights
          </li>
          <li className={!props.view ? 'hide' : ''}>Remove</li>
        </ul>
      </div>
      <Modal show={showUserRights} handleClose={handleClose}>
        test
        {/* <AddUserForm room={curRoom} handleClose={handleClose} /> */}
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ rooms }) => {
  return {
    rooms: rooms.rooms,
    room: rooms.room
  };
};

export default connect(mapStateToProps)(MemberData);
