import React from 'react';
import { Grid } from 'semantic-ui-react';

import Button from './ui/Button';
import { PASS } from '../services/rules';


const Messages = ({ list, handleIgnore }) => {
  const styles = {
    message: {
      fontSize: '12px',
      fontStyle: 'italic',
    },
    button: {
      display: 'none',
    },
    pass: {
      color: 'green',
    },
    error: {
      color: 'red',
    },
  };

  return (
    <div style={styles.message}>
      {list.length === 0
      ? <div style={styles.pass}>{PASS}</div>
      : list.map((message, i) => (
        <Grid verticalAlign={"bottom"} columns="equal" key={`error-message-${i}`}>
          <Grid.Column width={14}>
            <div style={styles.error}>{message.text}</div>
          </Grid.Column>
          <Grid.Column>
            {message.options &&
              message.options.map((option, j) => option === 'ignorable' &&
                <Button
                  style={styles.button}
                  size="mini"
                  key={`error-${i}-option-${j}`}
                  onClick={() => handleIgnore(message)}
                 >
                   {"Ignore"}
                </Button>)}
          </Grid.Column>
        </Grid>
      ))}
    </div>
  );
};


export default Messages;
