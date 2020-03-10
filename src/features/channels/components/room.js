import React, { Component } from 'react';
import './channels.css';

import { connect } from 'react-redux';
import { changeRoom, getDmRoomTitle } from '../../../actions';

import { Link } from 'react-router-dom';
import ChannelsSetting from '../channels-settings/channels-settings';

import { formatDMTitle } from '../../utils';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
      title: '',
    };

    this.preventBubbling = this.preventBubbling.bind(this);
    this.handleChannelChange = this.handleChannelChange.bind(this);
  }

  componentDidMount() {
    const {
      roomData: { room, DM, favorite },
      uid,
    } = this.props;

    if (favorite) {
      this.setState({ favorite: true });
    }

    if (DM) {
      const uidToFind = formatDMTitle(room, uid);

      getDmRoomTitle(uidToFind).then(title => this.setState({ title }));
    } else {
      this.setState({ title: room });
    }
  }

  preventBubbling(event) {
    event.stopPropagation();
  }

  handleChannelChange(event) {
    event.preventDefault();
    const { handleRoomChange } = this.props;
    const room = event.currentTarget.getAttribute('value');

    handleRoomChange(room);
  }

  render() {
    const { curRoom } = this.props;
    const { favorite, title } = this.state;

    return (
      <Link style={{ textDecoration: 'none' }} to="/">
        <li className={curRoom === title ? 'active' : ''}>
          <div onClick={this.handleChannelChange} value={title}>
            {title}
          </div>
          <div onClick={this.preventBubbling}>
            <ChannelsSetting room={title} favorite={favorite} />
          </div>
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
