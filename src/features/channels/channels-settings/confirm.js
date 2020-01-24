import React from 'react';
import './channels-settings.css';

import { connect } from 'react-redux';
import { leaveChat } from '../../../actions';

function Confirmation(props) {
  const { room, uid, leaveChat, handleClose } = props;

  const handleSubmit = () => {
    leaveChat(room, uid);
    handleClose();
  };

  return (
    <div>
      <div className="confirmation">
        Please confirm you want to leave the channel
      </div>
      <button className="conf__submit" onClick={handleSubmit}>
        YES
      </button>
      <button className="conf__decline" onClick={handleClose}>
        NO
      </button>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.user.uid,
  };
};

const mapDispatchToProps = {
  leaveChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
