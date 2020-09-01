import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { LinearProgress } from '@material-ui/core';
import SurveyForm from '../../organisms/SurveyForm';
import SuccessScreen from '../../atoms/SuccessScreen';

const Survey = ({ match }) => {
  const [survey, setSurvey] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answerData, setAnswerData] = useState({});

  useEffect(() => {
    axios.get(`surveys.php?id=${match.params.survey_id}`).then(response => {
      setSurvey(response.data);
    });
  }, []);

  const onSubmit = () => {
    setAnswerData({});
    setSubmitted(true);
  };

  return (
    <>
      {!submitted && !survey && <LinearProgress />}
      {!submitted && survey && <SurveyForm survey={survey} handleSubmit={onSubmit} />}
      {submitted && <SuccessScreen onStartNew={() => setSubmitted(false)} />}
    </>
  );
};

export default Survey;
