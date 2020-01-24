import React from 'react';

import { connect } from 'react-redux';
import { clearError } from '../../../actions';

function ErrorMessage(props) {
  const { clearError } = props;

  return <div onClick={clearError}>{props.error.message}</div>;
}

const mapDispatchToProps = {
  clearError,
};

export default connect(
  null,
  mapDispatchToProps
)(ErrorMessage);
