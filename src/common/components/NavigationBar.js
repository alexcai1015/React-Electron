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

import logo from '../../assets/rapidpass.svg';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: 'rgb(72, 34, 164)',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
});

export function NavigationBar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.nav}>
      <Container>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="menu" href="/">
            <img src={logo} width="48" height="48" alt="Logo" title="Logo" />
          </IconButton>

          <div>
            <Typography variant="h6">
              RapidPass.PH Dashboar <br />
            </Typography>
            v{process.env.REACT_APP_VERSION}
          </div>

          <div className={classes.grow} />

          <Button edge="end" color="inherit" href="/">
            Log Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
