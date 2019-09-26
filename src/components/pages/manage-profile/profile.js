import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser, registerUser } from '../../../actions';

function Profile(props) {
  const [name, setName] = React.useState(props.userName);
  const [email, setEmail] = React.useState(props.email);
  const [uid, setUid] = React.useState(props.uid);
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
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={!isEdit}
      />
      <br />
      <label>UID: </label>
      <input type='text' value={uid} disabled />
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
