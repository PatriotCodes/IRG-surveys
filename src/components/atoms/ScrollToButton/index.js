import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
}));

const ScrollToButton = () => {
  const [scrolled, setScrolled] = useState(false);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleBottomScroll = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const classes = useStyles();
  return !scrolled ? (
    <Fab className={classes.fab} color="primary" onClick={handleBottomScroll}>
      <ArrowDownwardIcon />
    </Fab>
  ) : null;
};

export default ScrollToButton;
