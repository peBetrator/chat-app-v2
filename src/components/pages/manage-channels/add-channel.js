import React, { Component } from 'react';
import './add-channel.css';

import { connect } from 'react-redux';
import { createRoom, searchRoom, getRooms } from '../../../actions';

class AddChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  componentDidUpdate(prevProps) {
    const { roomFound } = this.props;
    if (!roomFound && prevProps.roomFound !== roomFound)
      this.props.handleClose();
  }

  handleSubmit = e => {
    const { uid, createRoom, searchRoom, getRooms } = this.props;
    if (e.currentTarget.value === 'create') {
      createRoom(this.state.name, uid);
      this.props.handleClose();
    }
    if (e.currentTarget.value === 'search') searchRoom(this.state.name, uid);

    getRooms(uid);
    this.setState({ name: '' });
  };

  render() {
    const { roomFound } = this.props;
    return (
      <div className="row">
        <div className="column">
          Create <br />
          <input
            type="text"
            value={this.state.name}
            placeholder="channel name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button value="create" onClick={this.handleSubmit}>
            Create
          </button>
        </div>
        <div className="column">
          or Search <br />
          <input
            type="text"
            value={this.state.name}
            placeholder="channel name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button value="search" onClick={this.handleSubmit}>
            Search
          </button>
          <br />
          {roomFound ? 'room was found' : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    userName: auth.user.displayName,
    email: auth.user.email,
    uid: auth.user.uid,

    roomFound: rooms.roomFound,
  };
};

const mapDispatchToProps = {
  createRoom,
  searchRoom,
  getRooms,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChannelForm);
