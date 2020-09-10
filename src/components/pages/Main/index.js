import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../api/axios';
import { LinearProgress, Typography, Box, makeStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: theme.palette.text.main,
  },
}));

const Main = () => {
  const [surveys, setSurveys] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios.get('surveys.php').then(response => {
      setSurveys(response.data);
    });
  }, []);

  const classes = useStyles();

  return surveys ? (
    surveys.map((item, index) => (
      <Box m="16px 0" key={index}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box m="0 0 14px 0">
              <Typography className={classes.title}>{item.title}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/survey/${item.survey_id}`)}
            >
              Начать опрос
            </Button>
          </Box>
        </Paper>
      </Box>
    ))
  ) : (
    <LinearProgress />
  );
};

export default Main;
