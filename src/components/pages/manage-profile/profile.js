import React from 'react';
import './manage-profile.css';

import { connect } from 'react-redux';
import { changeName } from '../../../actions';

function Profile(props) {
  const { handleNameChange } = props;
  const [name, setName] = React.useState(props.userName);
  const [isEdit, setEdit] = React.useState(false);

  const handleSubmit = e => {
    if (isEdit) handleNameChange(name);
    setEdit(!isEdit);

    e.preventDefault();
  };

  return (
    // TODO create generic input for profile settings
    <form className="profile__table">
      <label>User Name: </label>
      <input
        type="text"
        value={name || ''}
        placeholder="please set your nickname"
        onChange={e => setName(e.target.value)}
        disabled={!isEdit}
      />
      <br />
      <label>UID: </label>
      <input type="text" value={props.uid} disabled />
      <button onClick={handleSubmit}>{isEdit ? 'Save' : 'Edit profile'}</button>
    </form>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    userName: auth.user.displayName,
    email: auth.user.email,
    uid: auth.user.uid,
  };
};

const mapDispatchToProps = {
  handleNameChange: changeName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
