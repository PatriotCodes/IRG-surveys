import React, { useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  FormHelperText,
} from '@material-ui/core';
import TextInput from '../TextInput';

const useStyles = makeStyles(() => ({
  fieldSet: {
    width: '100%',
  },
  radioGroup: props => ({
    '@media (max-width: 767px)': {
      flexDirection: 'column',
      padding: 0,
    },
    flexDirection: props.isHorizontal ? 'row' : 'column',
    justifyContent: props.isHorizontal ? 'space-between' : 'unset',
    padding: props.isTwoColumn ? 0 : '0 50px',
  }),
  twoColumn: {
    '@media (max-width: 767px)': {
      flexDirection: 'column',
      padding: 0,
    },
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 50px',
  },
}));

const RadioInput = ({
  answers,
  comments,
  onChange,
  isHorizontal,
  isTwoColumn,
  showError,
  hasError,
}) => {
  const [value, setValue] = useState('');
  const halfLength = Math.ceil(answers.length / 2);
  const leftSide = answers.slice(0, halfLength);
  const rightSide = answers.slice(halfLength, answers.length);

  const handleChange = e => {
    setValue(e.target.value);
    const indexOf = answers.indexOf(e.target.value);
    if (comments && comments.includes(indexOf + 1)) {
      onChange(indexOf, '');
    } else {
      onChange(answers.indexOf(e.target.value));
    }
  };

  const handleCommentChange = (val, index) => {
    onChange(index, val);
  };

  const classes = useStyles({
    isHorizontal,
    isTwoColumn,
  });
  return (
    <FormControl className={classes.fieldSet} component="fieldset" error={showError && hasError}>
      {!isTwoColumn ? (
        <RadioGroup className={classes.radioGroup} value={value} onChange={handleChange}>
          {answers.map((answer, index) => (
            <React.Fragment key={index}>
              <FormControlLabel value={answer} label={answer} control={<Radio color="primary" />} />
              {index === answers.indexOf(value) &&
                comments &&
                comments.includes(answers.indexOf(value) + 1) && (
                  <TextInput onChange={val => handleCommentChange(val, index)} />
                )}
            </React.Fragment>
          ))}
        </RadioGroup>
      ) : (
        <div className={classes.twoColumn}>
          <RadioGroup className={classes.radioGroup} value={value} onChange={handleChange}>
            {leftSide.map((answer, index) => (
              <React.Fragment key={index}>
                <FormControlLabel
                  value={answer}
                  label={answer}
                  control={<Radio color="primary" />}
                />
                {index === answers.indexOf(value) &&
                  comments &&
                  comments.includes(answers.indexOf(value) + 1) && (
                    <TextInput onChange={val => handleCommentChange(val, index)} />
                  )}
              </React.Fragment>
            ))}
          </RadioGroup>
          <RadioGroup className={classes.radioGroup} value={value} onChange={handleChange}>
            {rightSide.map((answer, index) => (
              <React.Fragment key={index}>
                <FormControlLabel
                  value={answer}
                  label={answer}
                  control={<Radio color="primary" />}
                />
                {index + halfLength === answers.indexOf(value) &&
                  comments &&
                  comments.includes(answers.indexOf(value) + 1) && (
                    <TextInput onChange={val => handleCommentChange(val, index + halfLength)} />
                  )}
              </React.Fragment>
            ))}
          </RadioGroup>
        </div>
      )}
      {hasError && showError && (
        <FormHelperText>Будь ласка переконайтеся, що обрана хоча б одна відповідь</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioInput;
