import React from 'react';
import './modal.css';

function Modal(props) {
  const showHideClassName = props.show
    ? 'modal display-block'
    : 'modal display-none';

  // TODO use React.createPortal to display modal window
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {props.children}
        <button onClick={props.handleClose}>close</button>
      </section>
    </div>
  );
}

export default Modal;
