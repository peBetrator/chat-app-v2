import React from 'react';
import { createPortal } from 'react-dom';
import './index.css';

import SVGIcon from './svg';

const Modal = props => {
  const { handleClose } = props.children.props;

  return createPortal(
    <div className="custom__modal">
      <section className="modal__main">
        <div className="modal__close" onClick={handleClose}>
          <SVGIcon name="close" width={10} />
        </div>
        {props.children}
      </section>
    </div>,
    document.body
  );
};

export default Modal;
