import React from 'react';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import logo from '../../assets/rapidpass.svg';
import { removeUser } from '../../store/slices';
import { PROTECTED_ROUTES } from '../../AppRoutes';
import { Colors } from '../constants/Colors';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: 'rgb(72, 34, 164)',
  },
  title: {
    marginRight: 24,
    position: 'relative',
    top: 10
  },
  navButtons: {
    textTransform: 'capitalize',
    '&.active': {
      top: 2,
      borderBottom: `4px solid ${Colors.HighlightAmber}`,
      borderRadius: 0,
    }
  }
});

export function NavigationBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const isActive = (value) => (window.location.pathname === value ? 'active' : '')

  return (
    <AppBar position="static" className={classes.nav}>
      <Container>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" href="/">
            <img src={logo} width="48" height="48" alt="Logo" title="Logo" />
          </IconButton>

          <div className={classes.title}>
            <Typography variant="h6">RapidPass.PH Dashboard</Typography>
            <sup>v{process.env.REACT_APP_VERSION}</sup>
          </div>

          {PROTECTED_ROUTES.map(({ path, title }) => (
            <Button key={path} edge="start" color="inherit" href={path}
              className={`${isActive(path)} ${classes.navButtons}`}>
              {title}
            </Button>
          ))}

          <div className={classes.grow} />

          <Button edge="end" color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </Container >
    </AppBar >
  );
}
