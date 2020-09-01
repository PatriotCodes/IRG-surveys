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
    '& a': {
      textDecoration: 'none!important',
    },
  },
  textBox: {
    marginLeft: 8,
    '& > p': {
      fontSize: '0.8em',
      lineHeight: 1,
      color: `${theme.palette.secondary.main}!important`,
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header} component="header">
      <Toolbar>
        <Box display="flex" component="a" href="/">
          <img src={logoSrc} width={42} height={42} alt="IRG" />
          <Box className={classes.textBox}>
            <Typography>Independent</Typography>
            <Typography>Research</Typography>
            <Typography>Group</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
