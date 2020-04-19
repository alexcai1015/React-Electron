import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem, Fade, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

function UserMenu({ username, children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
      >
        <SettingsIcon />
        <Typography variant="body1">{username}</Typography>
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
        open={open}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
      >
        {React.Children.map(children, (child) => (
          <MenuItem onClick={handleCloseMenu}>{child}</MenuItem>
        ))}
      </Menu>
    </>
  );
}

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default UserMenu;
