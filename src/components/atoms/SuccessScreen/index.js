import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Box, Typography, makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

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
  button: {
    margin: '16px 0 0 0',
  },
}));

const SuccessScreen = ({ onStartNew, alreadySubmitted }) => {
  // const history = useHistory();

  const classes = useStyles();
  return (
    <Box
      className={classes.success}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <DoneIcon />
      <Typography component="h2">
        {alreadySubmitted
          ? 'Ви вже приймали участь у даному опитуванні'
          : 'Дякуємо за участь у опитуванні!'}
      </Typography>
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
