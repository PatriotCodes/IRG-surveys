import React from 'react';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';
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
}));

const SuccessScreen = ({ onStartNew }) => {
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
      <Typography component="h2">Ответ успешно записан</Typography>
      <Button variant="contained" color="primary" onClick={onStartNew}>
        Начать новый опрос
      </Button>
    </Box>
  );
};

export default SuccessScreen;
