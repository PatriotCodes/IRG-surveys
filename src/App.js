import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, makeStyles, ThemeProvider } from '@material-ui/core';
import customTheme from './styles/customTheme';
import Main from './components/pages/Main';
import Survey from './components/pages/Survey';
import Header from './components/atoms/Header';
import Footer from './components/atoms/Footer';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
    minHeight: `calc(100vh - 56px)`,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={customTheme}>
      <Header position="sticky" />
      <Container className={classes.root} maxWidth="md" component="main">
        <Router>
          <Switch>
            <Route path="/survey/:survey_id" component={Survey} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
