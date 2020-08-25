import React from 'react';
import FormInput from '../../molecules/FormInput';
import { Box, Typography, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '12px 0',
  },
  surveyTitle: {
    fontSize: '1.6em',
  },
}));

const SurveyForm = ({ survey }) => {
  const classes = useStyles();

  const handleInputChange = val => {
    console.log(val);
  };

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
          onChange={handleInputChange}
        />
      ))}
    </Box>
  );
};

export default SurveyForm;
