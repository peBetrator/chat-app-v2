import React from 'react';
import './chat.css';

import Form from '../../features/messages/form/Form';
import Members from '../../features/members/members';

function Chat() {
  return (
    <div className="chat">
      <Form />
      <Members />
    </div>
  );
}

export default Chat;
