import React from 'react';
import './channels-settings.css';

import { connect } from 'react-redux';
import { leaveChat } from '../../../actions';

function Confirmation(props) {
  const { room, uid, leaveChat, handleClose } = props;

  return (
    <div>
      <div className='confirmation'>
        Please confirm you want to leave the channel
      </div>
      <button
        className='conf__submit'
        onClick={() => {
          leaveChat(room, uid);
        }}
      >
        YES
      </button>
      <button
        className='conf__decline'
        onClick={() => {
          props.handleClose();
        }}
      >
        NO
      </button>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.user.uid
  };
};

const mapDispatchToProps = {
  leaveChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation);
