import React from 'react';

import {
  addUserToRoom,
  searchUserByUid,
  searchUserByEmail,
} from '../../actions';

function AddUserForm(props) {
  const [userName, setUserName] = React.useState('');
  const [added, setAdded] = React.useState(false);

  const handleSubmit = event => {
    const { room } = props;

    if (validateEmail(userName)) {
      searchUserByEmail(userName).then(uid => {
        addUserToRoom(room, uid);
        displayMessage();
      });
    } else {
      searchUserByUid(userName).then(() => {
        addUserToRoom(room, userName);
        displayMessage();
      });
    }

    setUserName('');
  };

  const displayMessage = () => {
    const { handleClose } = props;

    setAdded(true);
    setTimeout(() => {
      handleClose();
      setAdded(false);
    }, 1000);
  };

  const handleChangeUsername = event => {
    setUserName(event.target.value);
  };

  // TODO add and separate validations
  const validateEmail = email => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div>
      Add User <br />
      <input
        type="text"
        value={userName}
        placeholder="UID or E-mail"
        onChange={handleChangeUsername}
      />
      <button value="create" onClick={handleSubmit}>
        Search
      </button>
      <br />
      {added ? 'user was found' : ''}
    </div>
  );
}

export default AddUserForm;
