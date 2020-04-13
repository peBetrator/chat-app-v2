import React, { useReducer } from 'react';
import { connect } from 'react-redux';

import {
  addUserToRoom,
  searchUserByUid,
  searchUserByEmail,
  userWasAddedBy,
} from '../../actions';

function AddUserForm(props) {
  const [input, setInput] = useReducer(
    (input, details) => ({
      ...input,
      ...details,
    }),
    {
      data: '',
      userAdded: false,
      error: '',
    }
  );

  const handleSubmit = async () => {
    const { room, displayName } = props;
    const { data } = input;

    try {
      const searchResult = validateEmail(data)
        ? await searchUserByEmail(data)
        : await searchUserByUid(data);

      if (searchResult && searchResult.foundUID && searchResult.foundUsername) {
        addUserToRoom(room, searchResult.foundUID).then(() => {
          userWasAddedBy(room, searchResult.foundUsername, displayName);
          displaySuccessMessage();
        });
      } else throw new Error('No user was found');
    } catch (error) {
      setInput({ error: error.message });
    }
    setInput({ data: '' });
  };

  const displaySuccessMessage = () => {
    const { handleClose } = props;

    setInput({ userAdded: true });
    setTimeout(() => {
      handleClose();
      setInput({ userAdded: false });
    }, 1000);
  };

  const handleChangeUsername = event => {
    setInput({ data: event.target.value });
  };

  // TODO add and separate validations
  const validateEmail = email => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div>
      <div className="align__center">Add User</div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={input.data}
          placeholder="UID or E-mail"
          onChange={handleChangeUsername}
        />
        <span className="input-group-btn">
          <button
            value="create"
            className="btn btn-primary mt-0"
            onClick={handleSubmit}
          >
            Search
          </button>
        </span>
      </div>
      {input.error && <p className="m-0 text-danger">{input.error}</p>}
      {input.userAdded && <p className="m-0 text-success">User was found</p>}
    </div>
  );
}

const mapStateToProps = ({ auth: { user } }) => {
  const displayName = user.displayName || user.email;
  return {
    displayName,
  };
};

export default connect(mapStateToProps)(AddUserForm);
