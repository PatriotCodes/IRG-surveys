import React from 'react';
import logoSrc from '../../../assets/images/logo.png';
import { AppBar, Toolbar, makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    height: theme.sizes.headerHeight,
    '& > div': {
      height: theme.sizes.headerHeight,
      minHeight: theme.sizes.headerHeight,
    },
  },
  textBox: {
    marginLeft: 8,
    '& > p': {
      fontSize: '0.8em',
      lineHeight: 1,
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header} component="header">
      <Toolbar>
        <img src={logoSrc} width={42} height={42} />
        <Box className={classes.textBox}>
          <Typography>Independent</Typography>
          <Typography>Research</Typography>
          <Typography>Group</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
