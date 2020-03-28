import React from 'react';
<<<<<<< HEAD
import { AppBar, Button, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

=======
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import logo from '../../assets/rapidpass.png';
>>>>>>> e19d08349f7108c42a49bbacd0c3e4eac29f1fa1
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

<<<<<<< HEAD
export function NavigationBar() {
=======

export function NavigationBar(props) {
>>>>>>> e19d08349f7108c42a49bbacd0c3e4eac29f1fa1
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.nav}>
<<<<<<< HEAD
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="menu" href="/">
          {/*  TODO: replace MenuIcon with RP logo */}
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          RapidPass.PH Dashboard
        </Typography>

        <div className={classes.grow} />

        <Button edge="end" color="inherit" href="/">
          Log Out
        </Button>
      </Toolbar>
=======
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
>>>>>>> e19d08349f7108c42a49bbacd0c3e4eac29f1fa1
    </AppBar>
  );
}
