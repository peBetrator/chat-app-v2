import React from 'react';
import { createPortal } from 'react-dom';
import './index.css';

import SVGIcon from './svg';

const Sidebar = props => {
  const { handleClose } = props.children.props;

  return createPortal(
    <div className="sidebar__main">
      <div className="sidebar__close" onClick={handleClose}>
        <SVGIcon name="close" width={13} />
      </div>
      {props.children}
    </div>,
    document.getElementById('content')
  );
};

export default Sidebar;
