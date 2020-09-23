import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { FORM_INPUT_TYPES, INTERVIEWER_ID, LOCAL_STORAGE_KEYS } from '../../../constants';
import surveyData from '../../../constants/survey';
import { LinearProgress } from '@material-ui/core';
import SurveyForm from '../../organisms/SurveyForm';
import convertToIBMSPSS, { CHECKED, UNCHECKED } from '../../../utils/convertToIBMSPSS';
import SuccessScreen from '../../atoms/SuccessScreen';

const Survey = ({ match }) => {
  const timeStart = Date.now();
  const survey = surveyData;
  const [answerData, setAnswerData] = useState(() =>
    survey.survey.map(q => {
      let answers = [''];
      if (q.answer) {
        if (parseInt(q.type) === 3) {
          answers = q.answer.map(_ => Array(q.variants.length).fill(UNCHECKED));
        } else {
          answers = Array.from(Array(q.answer.length)).map(_ => UNCHECKED);
        }
      }
      return {
        type: q.type,
        answers,
      };
    }),
  );
  const [errors, setErrors] = useState(
    survey.survey.map((_, index) => !!surveyData.survey[index].isRequired),
  );
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [surveyNotAvailable, setSurveyNotAvailable] = useState(false);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.completedSurveys));
    if (completed && completed.includes(match.params.survey_id)) {
      setAlreadySubmitted(true);
      setSubmitted(true);
    }
    // } else {
    // axios.get(`surveys.php?id=${match.params.survey_id}`).then(response => {
    //   // UGLY CHECK BECAUSE OF EVEN UGLIER BACK-END
    //   if (response.data.message) {
    //     setSurveyNotAvailable(true);
    //     setSubmitted(true);
    //   } else {
    //     setSurvey(response.data);
    //     answerData = response.data.survey.map(q => ({
    //       type: q.type,
    //       answers: q.answer ? Array.from(Array(q.answer.length)).map(_ => UNCHECKED) : [''],
    //     }));
    //   }
    // });
    // }
  }, []); // eslint-disable-line

  const validateErrors = answerData => {
    return answerData.map((a, index) => {
      if (!surveyData.survey[index].isRequired) {
        return false;
      }
      switch (a.type.toString()) {
        case FORM_INPUT_TYPES.radio:
          let allEmpty1 = true;
          for (let i = 0; i < a.answers.length; i++) {
            if (a.answers[i] === CHECKED) {
              allEmpty1 = false;
            }
            if (a.answers[i] !== CHECKED && a.answers[i] !== UNCHECKED) {
              if (a.answers[i] !== '') {
                allEmpty1 = false;
              }
            }
          }
          return allEmpty1;
        case FORM_INPUT_TYPES.checkbox:
          let allEmpty2 = true;
          for (let i = 0; i < a.answers.length; i++) {
            if (a.answers[i] === CHECKED) {
              allEmpty2 = false;
            }
            if (a.answers[i] !== CHECKED && a.answers[i] !== UNCHECKED) {
              if (a.answers[i] !== '') {
                allEmpty2 = false;
              }
            }
          }
          return allEmpty2;
        case FORM_INPUT_TYPES.text:
          return a.answers[0] === '';
        case FORM_INPUT_TYPES.table:
          for (let i = 0; i < a.answers.length; i++) {
            if (!a.answers[i].includes(CHECKED)) {
              return true;
            }
          }
          return false;
      }
    });
  };

  const handleChange = (val, index, textVal) => {
    let answerDataTmp;
    // eslint-disable-next-line
    switch (answerData[index].type.toString()) {
      case FORM_INPUT_TYPES.radio:
        answerDataTmp = {
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
        answerDataTmp = {
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
        answerDataTmp = {
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: [val],
          },
        };
        break;
      case FORM_INPUT_TYPES.table:
        answerDataTmp = {
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: val,
          },
        };
        break;
    }
    setAnswerData(answerDataTmp);
    setErrors(validateErrors(Object.values(answerDataTmp)));
  };

  const onSubmit = () => {
    axios
      .post(
        'results.php',
        {
          survey_id: match.params.survey_id,
          interviewer_id: INTERVIEWER_ID,
          time_start: timeStart,
          time_finish: Date.now(),
          location: {
            latitude: 0,
            longitude: 0,
          },
          audio: {
            name: 'audio',
            binary: '',
          },
          result: convertToIBMSPSS(Object.values(answerData)),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        setSubmitted(true);
        const completedSurveys = localStorage.getItem(LOCAL_STORAGE_KEYS.completedSurveys);
        if (completedSurveys) {
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.completedSurveys,
            JSON.stringify([...completedSurveys, match.params.survey_id]),
          );
        } else {
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.completedSurveys,
            JSON.stringify([match.params.survey_id]),
          );
        }
      });
  };

  return (
    <>
      {!submitted && !survey && <LinearProgress />}
      {!submitted && survey && (
        <SurveyForm
          survey={survey}
          errors={errors}
          handleSubmit={onSubmit}
          onChange={handleChange}
          answerData={answerData}
        />
      )}
      {submitted && (
        <SuccessScreen
          onStartNew={() => setSubmitted(false)}
          alreadySubmitted={alreadySubmitted}
          notAvailable={surveyNotAvailable}
        />
      )}
    </>
  );
};

export default Survey;
