import React, { useState, useEffect } from 'react';
import axios from './api/axios';
import { LinearProgress, Container, ThemeProvider, makeStyles } from '@material-ui/core';
import customTheme from './styles/customTheme';
import Header from './components/atoms/Header';
import Footer from './components/atoms/Footer';
import SurveyForm from './components/organisms/SurveyForm';
import SuccessScreen from './components/atoms/SuccessScreen';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
    minHeight: `calc(100vh - 56px)`,
  },
}));

const App = () => {
  const [surveys, setSurveys] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answerData, setAnswerData] = useState({});

  useEffect(() => {
    axios.get('surveys.php').then(response => {
      setSurveys(response.data);
    });
  }, []);

  const onSubmit = () => {
    setAnswerData({});
    setSubmitted(true);
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={customTheme}>
      <Header position="sticky" />
      <Container className={classes.root} maxWidth="md" component="main">
        {!submitted && !surveys && <LinearProgress />}
        {!submitted && surveys && <SurveyForm survey={surveys[0]} handleSubmit={onSubmit} />}
        {submitted && <SuccessScreen onStartNew={() => setSubmitted(false)} />}
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
