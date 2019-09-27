import React from 'react';

import { connect } from 'react-redux';

function Profile(props) {
  const [name, setName] = React.useState(props.userName);
  const [isEdit, setEdit] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    // TODO create generic input for profile settings
    <form onSubmit={handleSubmit}>
      <label>User Name: </label>
      <input
        type='text'
        value={name || ''}
        placeholder='please set your nickname'
        onChange={e => setName(e.target.value)}
        disabled={!isEdit}
      />
      <br />
      <label>UID: </label>
      <input type='text' value={props.uid} disabled />
      <button
        onClick={() => {
          setEdit(!isEdit);
        }}
      >
        {isEdit ? 'Save' : 'Edit profile'}
      </button>
    </form>
  );
}

function mapStateToProps({ auth }) {
  return {
    userName: auth.user.displayName,
    email: auth.user.email,
    uid: auth.user.uid
  };
}

export default connect(mapStateToProps)(Profile);
