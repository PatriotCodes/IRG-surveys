import React, { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const RadioInput = ({ answers, onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
    onChange(answers.indexOf(e.target.value));
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} onChange={handleChange}>
        {answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            value={answer}
            label={answer}
            control={<Radio color="primary" />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
