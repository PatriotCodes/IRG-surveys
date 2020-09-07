import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { LinearProgress } from '@material-ui/core';
import SurveyForm from '../../organisms/SurveyForm';
import convertToIBMSPSS, { CHECKED, UNCHECKED } from '../../../utils/convertToIBMSPSS';
import SuccessScreen from '../../atoms/SuccessScreen';

const Survey = ({ match }) => {
  const timeStart = Date.now();
  const [survey, setSurvey] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answerData, setAnswerData] = useState(null);

  useEffect(() => {
    axios.get(`surveys.php?id=${match.params.survey_id}`).then(response => {
      setSurvey(response.data);
      setAnswerData(
        response.data.survey.map(q => ({
          type: q.type,
          answers: q.answer ? Array.from(Array(q.answer.length)).map(_ => UNCHECKED) : [],
        })),
      );
    });
  }, []);

  const handleChange = (val, index) => {
    switch (answerData[index].type.toString()) {
      case '0':
        setAnswerData({
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: answerData[index].answers.map((a, index) =>
              index === val ? CHECKED : UNCHECKED,
            ),
          },
        });
        break;
      case '1':
        setAnswerData({
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: answerData[index].answers.map((a, index) => {
              console.log(val);
              if (index === val) {
                return a === CHECKED ? UNCHECKED : CHECKED;
              } else {
                return a;
              }
            }),
          },
        });
        break;
      case '2':
        setAnswerData({
          ...answerData,
          [index]: {
            ...answerData[index],
            answers: [val],
          },
        });
        break;
    }
  };

  const onSubmit = () => {
    // axios.post('results.php', {
    //   survey_id: match.params.survey_id,
    //   interviewer_id: 1,
    //   time_start: timeStart,
    //   time_finish: Date.now(),
    //   location: {
    //     latitude: null,
    //     longitude: null,
    //   },
    //   audio: {
    //     name: null,
    //     binary: null,
    //   },
    //   result: answerData,
    // });
    console.log({
      survey_id: match.params.survey_id,
      interviewer_id: 1,
      time_start: timeStart,
      time_finish: Date.now(),
      location: {
        latitude: null,
        longitude: null,
      },
      audio: {
        name: null,
        binary: null,
      },
      result: convertToIBMSPSS(answerData),
    });
    // setAnswerData({});
    // setSubmitted(true);
  };

  return (
    <>
      {!submitted && !survey && <LinearProgress />}
      {!submitted && survey && (
        <SurveyForm survey={survey} handleSubmit={onSubmit} onChange={handleChange} />
      )}
      {submitted && <SuccessScreen onStartNew={() => setSubmitted(false)} />}
    </>
  );
};

export default Survey;
