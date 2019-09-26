import React from 'react';

import { connect } from 'react-redux';
import { createRoom, searchRoom, getRooms } from '../../../actions';

function AddChannelForm(props) {
  const { uid } = props;
  const [name, setName] = React.useState('');

  const handleSubmit = e => {
    props.createRoom({ room: name, uid });
    props.handleClose();
    props.getRooms(uid);
  };

  const handleSearch = () => {
    props.searchRoom({ room: name, uid });
    props.handleClose();
    props.getRooms(uid);
  };

  return (
    <div>
      Create <br />
      Channel name:
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>Create</button>
      <br /> or Search <br />
      Channel name:
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    userName: auth.user.displayName,
    email: auth.user.email,
    uid: auth.user.uid
  };
};

const mapDispatchToProps = {
  createRoom,
  searchRoom,
  getRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChannelForm);
