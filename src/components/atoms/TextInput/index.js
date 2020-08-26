import React, { useState } from 'react';
import { Input, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  input: {
    width: '100%',
  },
}));

const TextInput = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const classes = useStyles();
  return (
    <Input
      className={classes.input}
      value={value}
      onChange={handleChange}
      placeholder="Ваш ответ"
    />
  );
};

export default TextInput;
