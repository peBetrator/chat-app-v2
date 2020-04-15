import React, { useState, useEffect } from 'react';
import './app-header.css';
import { connect } from 'react-redux';

import { makeRoomFavorite, getDmRoomTitle } from '../../../actions';
import { formatDMTitle } from '../../utils';

import SVGIcon from '../common/svg';

function Header(props) {
  const { isAuthenticated, uid, room, favoriteRooms, makeRoomFavorite } = props;
  const fillColor = favoriteRooms.map(room => room.room).includes(room)
    ? '#d6cd27'
    : '#000';
  const [roomTitle, setRoomTitle] = useState('');

  useEffect(() => {
    getTitle();
  }, [room]);

  const getTitle = () => {
    if (room.includes(uid)) {
      const uidToFind = formatDMTitle(room, uid);
      getDmRoomTitle(uidToFind).then(title => setRoomTitle(title));
    }
    setRoomTitle(room);
  };

  const handleRoomChange = () => {
    makeRoomFavorite(room, uid);
  };
  // TODO extract auth state from header component
  if (!isAuthenticated) return null;

  return (
    <div className="app__header">
      {!!room && (
        <div className="header__favorite" onClick={handleRoomChange}>
          <SVGIcon className="icon" name="star" fill={fillColor} width="13px" />
        </div>
      )}
      {roomTitle}
    </div>
  );
}

function mapStateToProps({ auth, rooms }) {
  return {
    isLoggingOut: auth.isLoggingOut,
    logoutError: auth.logoutError,
    isAuthenticated: auth.isAuthenticated,
    uid: auth.user.uid,

    room: rooms.room,
    favoriteRooms: rooms.favoriteRooms,
  };
}

const mapDispatchToProps = {
  makeRoomFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
