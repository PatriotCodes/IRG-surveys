import React from 'react';
import FormInput from '../../molecules/FormInput';
import ScrollToButton from '../../atoms/ScrollToButton';
import { Box, Typography, makeStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '12px 0',
  },
  surveyTitle: {
    fontSize: '1.6em',
  },
}));

const SurveyForm = ({ survey, handleSubmit, onChange }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper variant="outlined">
        <Box p={2}>
          <Typography className={classes.surveyTitle} component="h2">
            Опрос: {survey.title}
          </Typography>
        </Box>
      </Paper>
      {survey.survey.map((item, index) => (
        <FormInput
          key={index}
          type={item.type}
          answers={item.answer}
          title={item.text}
          additionalInfo={item.title}
          onChange={val => onChange(val, index)}
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Отправить
      </Button>
      <ScrollToButton />
    </Box>
  );
};

export default SurveyForm;
