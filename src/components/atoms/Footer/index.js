import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  footer: {
    '& > small': {
      fontSize: '0.75em',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer} component="footer" display="flex" justifyContent="center" m={2}>
      <Typography component="small">© {new Date().getFullYear()} IRG</Typography>
    </Box>
  );
};

export default Footer;
