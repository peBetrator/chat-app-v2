import React from 'react';
import { createPortal } from 'react-dom';
import './index.css';

const Modal = props => {
  const { title } = props;
  const { handleClose } = props.children.props;

  return createPortal(
    <div className="modal d-block bg-modal">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
