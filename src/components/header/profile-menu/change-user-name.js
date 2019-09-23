import React from 'react';
import '../app-header.css';

import { connect } from 'react-redux';
import { changeName } from '../../../actions';

function ChangeUserName(props) {
  const [name, setName] = React.useState(props.name);

  const { handleNameChange } = props;

  return (
    <div className='app__right' >
      <input value={name} onChange={e => setName(e.target.value)} />
      <button
        onClick={e => {
          e.preventDefault();
          handleNameChange(name);
          props.onChange();
        }}
      >
        OK
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  handleNameChange: changeName
};

export default connect(
  null,
  mapDispatchToProps
)(ChangeUserName);
