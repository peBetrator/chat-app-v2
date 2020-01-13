import React, { Component } from 'react';
import './channels.css';

import { connect } from 'react-redux';
import { changeRoom, getDmRoomTitle } from '../../actions';

import { Link } from 'react-router-dom';
import ChannelsSetting from './channels-settings/channels-settings';

import { formatDMTitle } from '../utils';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    const {
      roomData: { room, DM },
      uid,
    } = this.props;

    if (DM) {
      const uidToFind = formatDMTitle(room, uid);

      getDmRoomTitle(uidToFind).then(title => this.setState({ title }));
    } else {
      this.setState({ title: room });
    }
  }

  handleChannelChange = e => {
    const { handleRoomChange } = this.props;
    const room = e.currentTarget.getAttribute('value');

    handleRoomChange(room);
  };

  render() {
    const { curRoom } = this.props;
    const { title } = this.state;

    return (
      <Link style={{ textDecoration: 'none' }} to="/">
        <li
          className={curRoom === title ? 'active' : ''}
          onClick={this.handleChannelChange}
          value={title}
        >
          {title}
          <ChannelsSetting room={title} />
        </li>
      </Link>
    );
  }
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    rooms: rooms.rooms,
    curRoom: rooms.room,

    uid: auth.user.uid,
  };
};

const mapDispatchToProps = {
  handleRoomChange: changeRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
