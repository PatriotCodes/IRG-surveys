import React, { useState } from 'react';
import FormInput from '../../molecules/FormInput';
import ScrollToButton from '../../atoms/ScrollToButton';
import { QUESTIONS_ON_PAGE } from '../../../constants';
import { Box, Typography, makeStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '12px 0',
  },
  surveyTitle: {
    fontSize: '1.6em',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const SurveyForm = ({ survey, handleSubmit, onChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const classes = useStyles();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: document.body.offsetTop });
  };

  return (
    <Box className={classes.root}>
      <Paper variant="outlined">
        <Box p={2}>
          <Typography className={classes.surveyTitle} component="h2">
            {survey.title}
          </Typography>
        </Box>
      </Paper>
      {survey.survey
        .slice(currentStep * QUESTIONS_ON_PAGE, (currentStep + 1) * QUESTIONS_ON_PAGE)
        .map((item, index) => (
          <FormInput
            key={index + currentStep * QUESTIONS_ON_PAGE}
            type={item.type}
            answers={item.answer}
            title={item.text}
            additionalInfo={item.title}
            comments={item.comments}
            onChange={(val, textVal) =>
              onChange(val, index + currentStep * QUESTIONS_ON_PAGE, textVal)
            }
          />
        ))}
      <div className={classes.buttonContainer}>
        {(currentStep + 1) * QUESTIONS_ON_PAGE < survey.survey.length ? (
          <Button variant="contained" color="primary" onClick={handleNextStep}>
            Далее
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Отправить
          </Button>
        )}
      </div>
      {/*<ScrollToButton />*/}
    </Box>
  );
};

export default SurveyForm;
