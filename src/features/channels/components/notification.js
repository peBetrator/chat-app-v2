import React, { useEffect, useState } from 'react';
import './channels.css';

import { getRoomLastMessageTimestamp } from '../../../actions';

export default function Notification(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const {
      roomData: { room, lastRead: timestamp },
    } = props;
    const userTimestamp = timestamp;

    getRoomLastMessageTimestamp(room).then((roomData) => {
      if (!roomData) return;

      const { uid, message, timestamp } = roomData;
      const roomTimestamp = timestamp;

      if (userTimestamp && userTimestamp.timestamp < roomTimestamp) {
        console.log('show');
        setShow(true);
      }
    });
  }, []);

  return show && <div className="notification">*</div>;
}
