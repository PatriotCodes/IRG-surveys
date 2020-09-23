import React from 'react';
import RadioInput from '../../atoms/RadioInput';
import CheckboxInput from '../../atoms/CheckboxInput';
import TextInput from '../../atoms/TextInput';
import TableInput from '../../atoms/TableInput';
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

const FormInputByType = ({
  type,
  answers,
  comments,
  onChange,
  isRequired,
  isHorizontal,
  isTwoColumn,
  variants,
  hasError,
  showError,
}) => {
  switch (type.toString()) {
    case FORM_INPUT_TYPES.radio:
      return (
        <RadioInput
          answers={answers}
          onChange={onChange}
          comments={comments}
          isRequired={isRequired}
          isHorizontal={isHorizontal}
          isTwoColumn={isTwoColumn}
          hasError={hasError}
          showError={showError}
        />
      );
    case FORM_INPUT_TYPES.checkbox:
      return (
        <CheckboxInput
          answers={answers}
          comments={comments}
          onChange={onChange}
          hasError={hasError}
          showError={showError}
        />
      );
    case FORM_INPUT_TYPES.text:
      return <TextInput onChange={onChange} hasError={hasError} showError={showError} />;
    case FORM_INPUT_TYPES.table:
      return (
        <TableInput
          answers={answers}
          variants={variants}
          onChange={onChange}
          hasError={hasError}
          showError={showError}
        />
      );
    default:
      return null;
  }
};

const FormInput = ({
  title,
  type,
  additionalInfo,
  answers,
  comments,
  onChange,
  isRequired,
  isHorizontal,
  isTwoColumn,
  variants,
  hasError,
  showError,
}) => {
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
          <FormInputByType
            type={type}
            answers={answers}
            comments={comments}
            onChange={onChange}
            isRequired={isRequired}
            isHorizontal={isHorizontal}
            isTwoColumn={isTwoColumn}
            variants={variants}
            hasError={hasError}
            showError={showError}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default FormInput;
