import React, { useEffect, useReducer } from 'react';
import './members.css';

import { connect } from 'react-redux';
import { getMembers, isAdmin } from '../../actions';

import MemberData from './member-data';

const initMemberData = {
  selectedMember: -1,
  viewData: false,
};

function Members(props) {
  const [memberData, setMemberData] = useReducer(
    (state, details) => ({
      ...state,
      ...details,
    }),
    initMemberData
  );

  const { room, members, loadedMembers } = props;

  useEffect(() => {
    const { uid, getMembers } = props;

    getMembers(room);
    isAdmin(uid, room).then(rights => {
      setMemberData({ ...initMemberData, viewData: rights });
    });
  }, [room]);

  const selectMember = index => {
    setMemberData({ selectedMember: index });
  };

  if (!room) return null;

  return (
    <nav id="sidenav">
      <div className="sidenav__header">
        <h3>Chat Members</h3>
      </div>
      {!loadedMembers ? (
        <h2>Loading members</h2>
      ) : (
        <ul className="list-unstyled">
          {members.map(({ uid, email, userName }, i) => (
            <MemberData
              // TODO extract members data to redux store
              isSelected={memberData.selectedMember === i}
              select={selectMember}
              id={i}
              view={memberData.viewData}
              displayName={userName || email}
              uid={uid}
            />
          ))}
        </ul>
      )}
    </nav>
  );
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    uid: auth.user.uid,

    members: rooms.members,
    loadedMembers: rooms.loadedMembers,

    room: rooms.room,
  };
};

const mapDispatchToProps = {
  getMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
