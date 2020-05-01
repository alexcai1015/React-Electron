import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import logo from '../../../assets/rapidpass.svg';
import { useLogout } from '../../hooks';
import { serverEnv } from '../FeatureToggle';

import UserMenu from './UserMenu';
import { PROTECTED_ROUTES } from './ProtectedRoutes';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: theme.palette.mainPurple,
  },
  title: {
    marginRight: 24,
    position: 'relative',
    top: 10,
  },
  navButtons: {
    textTransform: 'capitalize',
    '&.active': {
      top: 2,
      borderBottom: `4px solid ${theme.palette.highlightAmber}`,
      borderRadius: 0,
    },
  },
}));

export function NavigationBar({ username }) {
  const classes = useStyles();
  const history = useHistory();
  const { execute: executeLogout } = useLogout();

  const handleLogout = () => {
    executeLogout();
  };

  const isActive = (value) => (window.location.pathname === value ? 'active' : '');

  return (
    <AppBar position="static" className={classes.nav}>
      <Container>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" href="/">
            <img src={logo} width="48" height="48" alt="Logo" title="Logo" />
          </IconButton>

          <div className={classes.title}>
            <Typography variant="h6">RapidPass.PH Dashboard</Typography>
            <sup title={serverEnv}>{`v${process.env.REACT_APP_VERSION}`}</sup>
          </div>

          {PROTECTED_ROUTES.filter(({ show }) => show).map(({ path, title }) => (
            <Button
              key={path}
              edge="start"
              color="inherit"
              onClick={() => history.push(path)}
              className={`${isActive(path)} ${classes.navButtons}`}
            >
              {title}
            </Button>
          ))}

          <div className={classes.grow} />
          <UserMenu username={username}>
            <Button edge="end" color="inherit" href="/change-password">
              Change Password
            </Button>
            <Button edge="end" color="inherit" href="/auth/logout">
              Log out
            </Button>
          </UserMenu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

NavigationBar.propTypes = {
  username: PropTypes.string,
};
