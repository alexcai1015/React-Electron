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

import logo from '../../assets/rapidpass.png';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: 'rgb(72, 34, 164)',
  },
  title: {
    // ! TODO: add DCTX font
  },
});

export function NavigationBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.nav}>
      <Container>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="menu" href="/">
            <img src={logo} width="48" height="48" alt="Logo" title="Logo" />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            RapidPass.PH Dashboard
          </Typography>

          <div className={classes.grow} />

          <Button edge="end" color="inherit" href="/">
            Log Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
