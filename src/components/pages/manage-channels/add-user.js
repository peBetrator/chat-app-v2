import React from 'react';
import { myFirebase } from '../../../firebase/firebase';

import { connect } from 'react-redux';
import { getRooms, addUserToRoom } from '../../../actions';

function AddUserForm(props) {
  const { room } = props;
  const [userName, setUserName] = React.useState('');
  const [added, setAdded] = React.useState(false);

  const handleSubmit = e => {
    searchUser(userName);
    setUserName('');
  };

  const displayMessage = () => {
    setAdded(true);
    setTimeout(() => {
      props.handleClose();
      setAdded(false);
    }, 1000);
  };

  const searchUser = user => {
    const usersRef = myFirebase.database().ref('users');

    if (validateEmail(user))
      usersRef
        .orderByChild('email')
        .equalTo(user)
        .once('value')
        .then(snapshot => {
          snapshot.forEach(data => {
            props.addUserToRoom(room, data.key);
            displayMessage();
          });
        });
    else
      usersRef
        .child(`/${user}/email`)
        .once('value')
        .then(data => {
          if (data.exists()) {
            props.addUserToRoom(room, user);
            displayMessage();
          }
        });
  };

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div>
      Add User <br />
      <input
        type='text'
        value={userName}
        placeholder='UID or E-mail'
        onChange={e => setUserName(e.target.value)}
      />
      <button value='create' onClick={handleSubmit}>
        Search
      </button>
      <br />
      {added ? 'user was found' : ''}
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
  getRooms,
  addUserToRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserForm);
