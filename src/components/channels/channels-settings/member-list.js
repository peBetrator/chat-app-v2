import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { getMembers } from '../../../actions';

function MemberList(props) {
  const { room, members, loadedMembers, handleClose } = props;
  const [anchorList, setAnchorList] = React.useState(null);

  const handleClick = event => {
    setAnchorList(event.currentTarget);
    props.getMembers(room);
  };

  return (
    <div>
      <div onClick={handleClick}>Show members</div>
      <Menu
        id='simple-menu'
        anchorEl={anchorList}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        open={Boolean(anchorList)}
        onClose={() => {
          handleClose();
          setAnchorList(null);
        }}
      >
        {!loadedMembers ? (
          <MenuItem>Loading members</MenuItem>
        ) : (
          members.map((member, i) => <MenuItem key={i}>{member}</MenuItem>)
        )}
      </Menu>
    </div>
  );
}

const mapStateToProps = ({ rooms }) => {
  return {
    members: rooms.members,
    loadedMembers: rooms.loadedMembers
  };
};

const mapDispatchToProps = {
  getMembers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList);
