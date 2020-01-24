import React, { useEffect } from 'react';
import './app-header.css';

import SVGIcon from '../common/svg';
import { connect } from 'react-redux';
import { makeRoomFavorite } from '../../../actions';

function Header(props) {
  const [width, setWidth] = React.useState(13);
  const { isAuthenticated, uid, room, favoriteRooms, makeRoomFavorite } = props;
  const fillColor = favoriteRooms.map(room => room.room).includes(room)
    ? '#d6cd27'
    : '#000';

  useEffect(() => {
    setWidth(13);
  }, [favoriteRooms]);

  const handleRoomChange = () => {
    setWidth(15);
    makeRoomFavorite(room, uid);
  };

  // TODO extract auth state from header component
  if (!isAuthenticated) return null;

  return (
    <div className="app__header">
      {!!room && (
        <div className="header__favorite" onClick={handleRoomChange}>
          <SVGIcon name="star" fill={fillColor} width={width} />
        </div>
      )}

      {room}
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
