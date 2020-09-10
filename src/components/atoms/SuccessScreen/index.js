import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Box, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  success: {
    minHeight: `calc(100vh - ${theme.sizes.headerHeight}px - 50px)`,
    '& > svg': {
      width: 56,
      height: 56,
      fill: theme.palette.success.main,
    },
    '& > h2': {
      fontSize: '1.2em',
      margin: '16px 0',
    },
  },
  error: {
    '& > svg': {
      fill: 'red',
    },
  },
  button: {
    margin: '16px 0 0 0',
  },
}));

const SuccessScreen = ({ onStartNew, alreadySubmitted, notAvailable }) => {
  // const history = useHistory();

  const classes = useStyles();

  let text = 'Дякуємо за участь у опитуванні!';
  if (notAvailable) {
    text = 'На жаль дане опитування не знайдено або завершено';
  }
  if (alreadySubmitted) {
    text = 'Ви вже приймали участь у даному опитуванні';
  }

  return (
    <Box
      className={clsx(classes.success, { [classes.error]: notAvailable })}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {!notAvailable ? <DoneIcon /> : <ClearIcon />}
      <Typography component="h2">{text}</Typography>
      {/*<Box display="flex" flexDirection="column">*/}
      {/*  <Button*/}
      {/*    className={classes.button}*/}
      {/*    variant="contained"*/}
      {/*    color="primary"*/}
      {/*    onClick={() => history.push('/')}*/}
      {/*  >*/}
      {/*    Перейти к выбору опроса*/}
      {/*  </Button>*/}
      {/*  <Button className={classes.button} variant="contained" color="primary" onClick={onStartNew}>*/}
      {/*    Начать опрос заново*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Box>
  );
};

export default SuccessScreen;
