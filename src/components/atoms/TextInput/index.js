import React, { useState } from 'react';
import { FormControl, FormHelperText, Input, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  input: {
    width: '100%',
  },
  fieldSet: {
    width: '100%',
  },
}));

const TextInput = ({ initialValue = '', onChange, hasError, showError }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const classes = useStyles();
  return (
    <FormControl className={classes.fieldSet} component="fieldset" error={hasError && showError}>
      <Input
        className={classes.input}
        value={value}
        onChange={handleChange}
        placeholder="Ваша відповідь"
      />
      {hasError && showError && (
        <FormHelperText>Будь ласка переконайтеся, що обрана хоча б одна відповідь</FormHelperText>
      )}
    </FormControl>
  );
};

export default TextInput;
