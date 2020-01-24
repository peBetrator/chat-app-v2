import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { myFirebase } from '../../firebase/firebase';
import './members.css';

import { getMembers } from '../../actions';
import MemberData from './member-data';

function Members(props) {
  const [viewData, setViewData] = useState(false);
  const [selectedMember, setSelected] = useState(-1);

  const { uid, room, members, loadedMembers } = props;

  useEffect(() => {
    const { getMembers } = props;

    setViewData(false);
    setSelected(-1);

    getMembers(room);
    isAdmin(uid, room);
  }, [room]);

  const selectMember = index => {
    setSelected(index);
  };

  const isAdmin = (uid, room) => {
    myFirebase
      .database()
      .ref(`users/${uid}/rooms/${room}/admin`)
      .once('value')
      .then(userSnap => {
        if (userSnap.exists()) {
          setViewData(true);
        }
      });
  };

  return (
    <div className="right">
      {room && <h3>Chat Members</h3>}
      {room && !loadedMembers ? (
        <div>Loading members</div>
      ) : (
        members.map(({ uid, email, userName }, i) => (
          <div key={i}>
            <MemberData
              // TODO extract members data to redux store
              isSelected={selectedMember === i}
              select={selectMember}
              id={i}
              view={viewData}
              displayName={userName || email}
              uid={uid}
            />
          </div>
        ))
      )}
    </div>
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
