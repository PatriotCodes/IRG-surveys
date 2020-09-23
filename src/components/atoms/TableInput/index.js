import React, { useState } from 'react';
import {
  Radio,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  makeStyles,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import clsx from 'clsx';
import { CHECKED, UNCHECKED } from '../../../utils/convertToIBMSPSS';

const useStyles = makeStyles(() => ({
  th: {
    textAlign: 'center',
  },
  td: {
    padding: 8,
    '@media (max-width: 767px)': {
      padding: 4,
    },
    '@media (max-width: 500px)': {
      padding: 0,
    },
  },
  radio: {
    '@media (max-width: 500px)': {
      padding: 3,
    },
  },
  fieldSet: {
    width: '100%',
  },
}));

const TableInput = ({ answers, onChange, variants, hasError, showError }) => {
  const [value, setValue] = useState(answers.map(_ => Array(variants.length).fill(UNCHECKED)));

  const handleChange = (e, i1, i2) => {
    const newState = value.map((q, i) =>
      i === i1 ? q.map((v, ind) => (ind === i2 ? CHECKED : UNCHECKED)) : q,
    );
    setValue(newState);
    onChange(newState);
  };

  const classes = useStyles();
  return (
    <FormControl className={classes.fieldSet} component="fieldset" error={showError && hasError}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.td}>Запитання</TableCell>
            {variants.map((v, index) => (
              <TableCell key={index} className={clsx(classes.td, classes.th)}>
                {v}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {answers.map((a, index) => (
            <TableRow key={index}>
              <TableCell className={classes.td}>{a}</TableCell>
              {variants.map((_, varIndex) => (
                <TableCell key={varIndex} className={clsx(classes.td, classes.th)}>
                  <Radio
                    className={classes.radio}
                    color="primary"
                    onChange={e => handleChange(e, index, varIndex)}
                    checked={value[index][varIndex] === CHECKED}
                    size="small"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasError && showError && (
        <FormHelperText>Будь ласка переконайтеся, що обрана хоча б одна відповідь</FormHelperText>
      )}
    </FormControl>
  );
};

export default TableInput;
