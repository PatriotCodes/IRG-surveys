import React from 'react';
import RadioInput from '../../atoms/RadioInput';
import CheckboxInput from '../../atoms/CheckboxInput';
import TextInput from '../../atoms/TextInput';
import { FORM_INPUT_TYPES } from '../../../constants';
import { Typography, Box, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  question: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: theme.palette.text.main,
  },
  additionalInfo: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    color: theme.palette.text.red,
  },
}));

const FormInputByType = ({ type, answers, onChange }) => {
  switch (type.toString()) {
    case FORM_INPUT_TYPES.radio:
      return <RadioInput answers={answers} onChange={onChange} />;
    case FORM_INPUT_TYPES.checkbox:
      return <CheckboxInput answers={answers} onChange={onChange} />;
    case FORM_INPUT_TYPES.text:
      return <TextInput onChange={onChange} />;
    default:
      return null;
  }
};

const FormInput = ({ title, type, additionalInfo, answers, onChange }) => {
  const classes = useStyles();

  return (
    <Box m="16px 0">
      <Paper variant="outlined">
        <Box p={2}>
          <Box m="0 0 14px 0">
            <Typography className={classes.question}>{title}</Typography>
            {additionalInfo && (
              <Typography className={classes.additionalInfo}>{additionalInfo}</Typography>
            )}
          </Box>
          <FormInputByType type={type} answers={answers} onChange={onChange} />
        </Box>
      </Paper>
    </Box>
  );
};

export default FormInput;
