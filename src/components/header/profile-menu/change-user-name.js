import React from 'react';
import '../app-header.css';

import { connect } from 'react-redux';
import { changeName, changeAllRoomReferences } from '../../../actions';

function ChangeUserName(props) {
  const { uid, onChange, handleNameChange } = props;
  const [name, setName] = React.useState(props.name);

  const handleSubmit = e => {
    handleNameChange(name);
    onChange();
    changeAllRoomReferences(props.name, name, uid);

    e.preventDefault();
  };

  return (
    <div className="app__right">
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>OK</button>
    </div>
  );
}

function mapStateToProps({ auth }) {
  return {
    uid: auth.user.uid,
  };
}

const mapDispatchToProps = {
  handleNameChange: changeName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserName);
