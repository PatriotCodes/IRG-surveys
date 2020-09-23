import React, { useState } from 'react';
import TextInput from '../TextInput';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Box,
  Checkbox,
  makeStyles,
  FormHelperText,
} from '@material-ui/core';

const CommentInput = ({ index, answer, onChange }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = () => {
    if (showInput) {
      onChange(index);
    } else {
      onChange(index, inputValue);
    }
    setShowInput(!showInput);
  };

  const handleChangeInput = val => {
    setInputValue(val);
    onChange(index, val);
  };

  return (
    <>
      <FormControlLabel
        key={index}
        control={<Checkbox color="primary" onChange={handleChange} value={answer} />}
        label={answer}
      />
      {showInput && (
        <Box m={1}>
          <TextInput initialValue={inputValue} onChange={handleChangeInput} />
        </Box>
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  fieldSet: {
    width: '100%',
  },
  formGroup: {
    padding: '0 50px',
  },
}));

const CheckboxInput = ({ answers, comments, onChange, hasError, showError }) => {
  const handleChange = e => {
    onChange(answers.indexOf(e.target.value));
  };

  const handleChangeComment = (index, textVal) => {
    if (textVal || textVal === '') {
      onChange(index, textVal);
    } else {
      onChange(index);
    }
  };

  const classes = useStyles();
  return (
    <div>
      <FormControl
        className={classes.fieldSet}
        style={{ display: 'flex' }}
        component="fieldset"
        error={showError && hasError}
      >
        <FormGroup className={classes.formGroup}>
          {answers.map((answer, index) => (
            <React.Fragment key={index}>
              {comments && comments.includes(index + 1) ? (
                <CommentInput index={index} answer={answer} onChange={handleChangeComment} />
              ) : (
                <FormControlLabel
                  key={index}
                  control={<Checkbox color="primary" onChange={handleChange} value={answer} />}
                  label={answer}
                />
              )}
            </React.Fragment>
          ))}
        </FormGroup>
        {hasError && showError && (
          <FormHelperText>Будь ласка переконайтеся, що обрана хоча б одна відповідь</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default CheckboxInput;
