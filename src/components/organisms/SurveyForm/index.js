import React, { useState } from 'react';
import FormInput from '../../molecules/FormInput';
import Text from '../../atoms/Text';
import { paging } from '../../../constants/survey';
import { Box, Typography, makeStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '12px 0',
  },
  surveyTitle: {
    fontSize: '1.6em',
  },
  surveySubtitle: {
    padding: '15px 0',
    '& > p:last-child': {
      fontWeight: 'bold',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    fontSize: '0.8em',
    color: 'red',
  },
}));

const SurveyForm = ({ survey, handleSubmit, onChange, errors }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showError, setShowError] = useState(false);
  const classes = useStyles();

  const completedQuestions = paging.slice(0, currentStep).reduce((acc, item) => (acc += item), 0);

  const handleNextStep = () => {
    if (errors.slice(completedQuestions, paging[currentStep] + completedQuestions).includes(true)) {
      setShowError(true);
    } else {
      setShowError(false);
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: document.body.offsetTop });
    }
  };

  return (
    <Box className={classes.root}>
      <Paper variant="outlined">
        <Box p={2}>
          <Typography className={classes.surveyTitle} component="h2">
            {survey.title}
          </Typography>
          <Box className={classes.surveySubtitle}>
            <Text className={classes.surveySubtitle} text={survey.subtitle} />
          </Box>
        </Box>
      </Paper>
      {survey.survey
        .slice(completedQuestions, paging[currentStep] + completedQuestions)
        .map((item, index) => (
          <FormInput
            key={index + completedQuestions}
            type={item.type}
            answers={item.answer}
            title={item.title}
            additionalInfo={item.text}
            comments={item.comments}
            onChange={(val, textVal) => onChange(val, index + completedQuestions, textVal)}
            isRequired={item.isRequired}
            isHorizontal={item.isHorizontal}
            isTwoColumn={item.isTwoColumn}
            variants={item.variants}
            hasError={errors[index + completedQuestions]}
            showError={showError}
          />
        ))}
      <div className={classes.buttonContainer}>
        {showError && (
          <Typography className={classes.error}>
            Будь ласка, переконайтеся, що обрана хоча б одна відповідь на кожну фразу
          </Typography>
        )}
        {paging.length !== currentStep + 1 ? (
          <Button variant="contained" color="primary" onClick={handleNextStep}>
            Далі
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Надіслати
          </Button>
        )}
      </div>
      {/*<ScrollToButton />*/}
    </Box>
  );
};

export default SurveyForm;
