import React from 'react';
import './chat.css'

import Form from '../../form/form';
import Members from '../../members/members';

function Chat() {
  return (
    <div className='chat'>
      <Form />
      <Members />
    </div>
  );
}

export default Chat;
