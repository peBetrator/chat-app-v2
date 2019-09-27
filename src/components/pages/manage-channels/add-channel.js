import React from 'react';

import { connect } from 'react-redux';
import { createRoom, searchRoom, getRooms } from '../../../actions';

function AddChannelForm(props) {
  const { uid } = props;
  const [name, setName] = React.useState('');

  const handleSubmit = e => {
    if (e.currentTarget.value === 'create')
      props.createRoom({ room: name, uid });
    if (e.currentTarget.value === 'search')
      props.searchRoom({ room: name, uid });

    props.handleClose();
    props.getRooms(uid);
    setName('');
  };

  return (
    <div>
      Create <br />
      <input
        type='text'
        value={name}
        placeholder='channel name'
        onChange={e => setName(e.target.value)}
      />
      <button value='create' onClick={handleSubmit}>
        Create
      </button>
      <br /> or Search <br />
      <input
        type='text'
        value={name}
        placeholder='channel name'
        onChange={e => setName(e.target.value)}
      />
      <button value='search' onClick={handleSubmit}>
        Search
      </button>
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
