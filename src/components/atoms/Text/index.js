import React from 'react';
import { Typography } from '@material-ui/core';

export default function Text(props) {
  return props.text || props.text === 0
    ? props.text.toString()
      ? props.text
          .toString()
          .split('\n')
          .map((i, key) => {
            return i.length ? (
              <Typography key={key} style={{ margin: 0 }} component="p">
                {i}
              </Typography>
            ) : (
              <br key={key} />
            );
          })
      : props.text.toString()
    : null;
}
