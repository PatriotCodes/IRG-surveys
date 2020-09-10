import React, { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import TextInput from '../TextInput';

const RadioInput = ({ answers, comments, onChange }) => {
  const [value, setValue] = useState('');

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

  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} onChange={handleChange}>
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
    </FormControl>
  );
};

export default RadioInput;
