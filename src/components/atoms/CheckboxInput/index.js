import React, { useState } from 'react';
import TextInput from '../TextInput';
import { FormControl, FormGroup, FormControlLabel, Box, Checkbox } from '@material-ui/core';

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

const CheckboxInput = ({ answers, comments, onChange }) => {
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

  return (
    <div>
      <FormControl>
        <FormGroup>
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
      </FormControl>
    </div>
  );
};

export default CheckboxInput;
