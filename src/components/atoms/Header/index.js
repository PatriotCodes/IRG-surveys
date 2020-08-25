import React from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    height: theme.sizes.headerHeight,
    '& > div': {
      height: theme.sizes.headerHeight,
      minHeight: theme.sizes.headerHeight,
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header}>
      <Toolbar></Toolbar>
    </AppBar>
  );
};

export default Header;
