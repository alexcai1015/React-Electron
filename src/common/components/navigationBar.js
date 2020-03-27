import React from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const NavigationBar = withStyles({
  grow: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: "rgb(72, 34, 164)"
  },
  title: {
    // TODO: add DCTX font
  },
  navButton: {
    textTransform: 'uppercase'
  }
})((props) => {
  const { classes } = props;
  return (
    <AppBar position="static" className={classes.nav}>
      <Toolbar className={classes.toolbar}>

        <IconButton edge="start" color="inherit" aria-label="menu">
          {/*  TODO: replace MenuIcon with RP logo */}
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          RapidPass.PH Dashboard
      </Typography>

        <div className={classes.grow} />

        <Button edge="end" color="inherit" className={props.navButton}>Log Out</Button>
      </Toolbar>
    </AppBar>
  )
});