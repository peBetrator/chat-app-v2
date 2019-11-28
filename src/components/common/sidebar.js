import React from 'react';
import './sidebar.css';

import SVGIcon from './svg';

function Sidebar(props) {
  const { handleClose } = props;
  const showHideClassName = props.show
    ? 'sidebar__main show'
    : 'sidebar__main hide';

  return (
    <div className={showHideClassName}>
      <div className="sidebar__close" onClick={handleClose}>
        <SVGIcon name="close" width={13} />
      </div>
      {props.children}
    </div>
  );
}

export default Sidebar;
