import React, { useEffect } from 'react';
import './members.css';

import MemberData from './member-data';
import { connect } from 'react-redux';
import { getMembers } from '../../actions';

function Members(props) {
  const { room, members, loadedMembers } = props;

  useEffect(() => {
    props.getMembers(room);
  }, [room]);

  return (
    <div className='right'>
      {room && <h3>Chat Members</h3>}
      {room && !loadedMembers ? (
        <div>Loading members</div>
      ) : (
        members.map((member, i) => (
          <div key={i}>
            <MemberData member={member} />
          </div>
        ))
      )}
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

const mapDispatchToProps = {
  getMembers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);
