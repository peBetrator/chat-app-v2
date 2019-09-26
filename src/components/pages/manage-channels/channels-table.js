import React, { Component } from 'react';

import Modal from '../../modal/modal';
import { connect } from 'react-redux';
import { changeRoom, getRooms } from '../../../actions';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  renderRow = ({ room }, idx) => {
    return (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{room}</td>
        <td>
          <button
          // onClick={() => onDelete(id)}
          >
            Add user
          </button>
          <button
          // onClick={() => onIncrease(id)}
          >
            Private / Public
          </button>
          <button
          // onClick={() => onDecrease(id)}
          >
            Leave chat
          </button>
        </td>
      </tr>
    );
  };

  render() {
    const { rooms } = this.props;
    return (
      <div>
        <h2>Manage Your Channels</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Channel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(this.renderRow)}
            <tr>
              <td colSpan='3'>
                <button type='button' onClick={this.showModal}>
                  Add room...
                </button>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  <p>Modal</p>
                  <p>Data</p>
                </Modal>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, rooms }) => {
  return {
    rooms: rooms.rooms,

    uid: auth.user.uid
  };
};

const mapDispatchToProps = {
  handleRoomChange: changeRoom,
  handleGetRooms: getRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
