import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { FORM_INPUT_TYPES, INTERVIEWER_ID, LOCAL_STORAGE_KEYS } from '../../../constants';
import { LinearProgress } from '@material-ui/core';
import SurveyForm from '../../organisms/SurveyForm';
import convertToIBMSPSS, { CHECKED, UNCHECKED } from '../../../utils/convertToIBMSPSS';
import SuccessScreen from '../../atoms/SuccessScreen';

let answerData = {};

const Survey = ({ match }) => {
  const timeStart = Date.now();
  const [survey, setSurvey] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.completedSurveys));
    if (completed && completed.includes(match.params.survey_id)) {
      setAlreadySubmitted(true);
      setSubmitted(true);
    } else {
      axios.get(`surveys.php?id=${match.params.survey_id}`).then(response => {
        setSurvey(response.data);
        answerData = response.data.survey.map(q => ({
          type: q.type,
          answers: q.answer ? Array.from(Array(q.answer.length)).map(_ => UNCHECKED) : [''],
        }));
      });
    }
  }, []); // eslint-disable-line

  const handleChange = (val, index, textVal) => {
    // eslint-disable-next-line
    switch (answerData[index].type.toString()) {
      case FORM_INPUT_TYPES.radio:
        answerData = {
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: answerData[index].answers.map((a, index) => {
              if (index === val) {
                if (textVal || textVal === '') {
                  return textVal;
                } else {
                  return CHECKED;
                }
              } else {
                return UNCHECKED;
              }
            }),
          },
        };
        break;
      case FORM_INPUT_TYPES.checkbox:
        answerData = {
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: answerData[index].answers.map((a, index) => {
              if (index === val) {
                if (textVal || textVal === '') {
                  return textVal;
                } else {
                  if (a !== CHECKED && a !== UNCHECKED) {
                    return UNCHECKED;
                  }
                  return a === CHECKED ? UNCHECKED : CHECKED;
                }
              } else {
                return a;
              }
            }),
          },
        };
        break;
      case FORM_INPUT_TYPES.text:
        answerData = {
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: [val],
          },
        };
        break;
    }
  };

  const onSubmit = () => {
    console.log(answerData);
    console.log(convertToIBMSPSS(Object.values(answerData)));
    // axios
    //   .post(
    //     'results.php',
    //     {
    //       survey_id: match.params.survey_id,
    //       interviewer_id: INTERVIEWER_ID,
    //       time_start: timeStart,
    //       time_finish: Date.now(),
    //       location: {
    //         latitude: 0,
    //         longitude: 0,
    //       },
    //       audio: {
    //         name: 'audio',
    //         binary: '',
    //       },
    //       result: convertToIBMSPSS(Object.values(answerData)),
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   )
    //   .then(() => {
    //     answerData = {};
    //     setSubmitted(true);
    //     const completedSurveys = localStorage.getItem(LOCAL_STORAGE_KEYS.completedSurveys);
    //     if (completedSurveys) {
    //       localStorage.setItem(
    //         LOCAL_STORAGE_KEYS.completedSurveys,
    //         JSON.stringify([...completedSurveys, match.params.survey_id]),
    //       );
    //     } else {
    //       localStorage.setItem(
    //         LOCAL_STORAGE_KEYS.completedSurveys,
    //         JSON.stringify([match.params.survey_id]),
    //       );
    //     }
    //   });
  };

  return (
    <>
      {!submitted && !survey && <LinearProgress />}
      {!submitted && survey && (
        <SurveyForm survey={survey} handleSubmit={onSubmit} onChange={handleChange} />
      )}
      {submitted && (
        <SuccessScreen onStartNew={() => setSubmitted(false)} alreadySubmitted={alreadySubmitted} />
      )}
    </>
  );
};

export default Survey;
