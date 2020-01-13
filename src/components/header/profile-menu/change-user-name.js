import React, { useState } from 'react';
import '../app-header.css';

import { connect } from 'react-redux';
import { changeName } from '../../../actions';

function ChangeUserName(props) {
  const [name, setName] = useState(props.name);

  const handleSubmit = e => {
    const { onChange, handleNameChange } = props;

    handleNameChange(name);
    onChange();

    e.preventDefault();
  };

  return (
    <div className="app__right">
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>OK</button>
    </div>
  );
}

const mapDispatchToProps = {
  handleNameChange: changeName,
};

export default connect(null, mapDispatchToProps)(ChangeUserName);
