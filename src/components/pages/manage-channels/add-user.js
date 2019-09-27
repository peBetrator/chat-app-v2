import React from 'react';
import { myFirebase } from '../../../firebase/firebase';

import { connect } from 'react-redux';
import { getRooms, addUserToRoom } from '../../../actions';

function AddUserForm(props) {
  const { room } = props;
  const [userName, setUserName] = React.useState('');

  const handleSubmit = e => {
    searchUser(userName);
    props.handleClose();
    setUserName('');
  };

  const searchUser = user => {
    const usersRef = myFirebase.database().ref('users');

    if (validateEmail(user))
      usersRef
        .orderByChild('email')
        .equalTo(user)
        .once('value', snapshot => {
          snapshot.forEach(data => {
            props.addUserToRoom({ room, uid: data.key });
          });
        });
    else
      usersRef.child(`/${user}/email`).once('value', data => {
        if (data.exists()) props.addUserToRoom({ room, uid: user });
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
