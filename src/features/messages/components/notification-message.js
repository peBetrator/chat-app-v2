import React from 'react';
import './message.css'

export default function NotificationMessage(props) {
  const {
    message: { message },
  } = props;

  return <div className="notification__message">{message}</div>;
}
