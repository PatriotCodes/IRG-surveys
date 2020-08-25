import React, { useState, useEffect } from 'react';
import axios from './api/axios';
import { LinearProgress, Container, ThemeProvider, makeStyles } from '@material-ui/core';
import customTheme from './styles/customTheme';
import Header from './components/atoms/Header';
import SurveyForm from './components/organisms/SurveyForm';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
  },
}));

const App = () => {
  const [surveys, setSurveys] = useState(null);

  useEffect(() => {
    axios.get('surveys.php').then(response => {
      setSurveys(response.data);
    });
  }, []);

  const classes = useStyles();
  return (
    <ThemeProvider theme={customTheme}>
      <Header position="sticky" />
      <Container className={classes.root} maxWidth="md">
        {surveys ? <SurveyForm survey={surveys[0]} /> : <LinearProgress />}
      </Container>
    </ThemeProvider>
  );
};

export default App;
