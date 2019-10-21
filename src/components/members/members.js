import React, { useEffect } from 'react';
import { myFirebase } from '../../firebase/firebase';
import './members.css';

import MemberData from './member-data';
import { connect } from 'react-redux';
import { getMembers } from '../../actions';

function Members(props) {
  const { uid, room, rooms, members, loadedMembers } = props;
  const [viewData, setViewData] = React.useState(false);

  useEffect(() => {
    setViewData(false);
    props.getMembers(room);

    isAdmin(uid, room);
  }, [room]);

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
    <div className='right'>
      {room && <h3>Chat Members</h3>}
      {room && !loadedMembers ? (
        <div>Loading members</div>
      ) : (
        members.map((member, i) => (
          <div key={i}>
            <MemberData member={member} view={viewData} />
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

    rooms: rooms.rooms,
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
