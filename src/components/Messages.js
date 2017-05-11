import React from 'react';
import { Grid } from 'semantic-ui-react';

import { PASS } from 'services/rules';
import Button from './inputs/Button';

const Messages = ({ list, handleIgnore }) => {
  const styles = {
    message: {
      fontSize: '14px',
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

  const renderHelp = (rule) => {
    let help;

    switch (rule) {
    case 'maxLength':
      help = (
        <div>
          {"Got a lot to say? Try making a "}
          <a href="https://docs.google.com/document/u/0/?tgif=d">Google Doc</a>
          {" Or a "}
          <a href="https://github.com/rangle/hub/wiki/_new">Wiki Article</a>
          {"."}
        </div>
      );
      break;
    default:
      break;
    }
    return help;
  };

  return (
    <div style={styles.message}>
      {list.length === 0
      ? <div style={styles.pass}>{PASS}</div>
      : list.map((message, i) => (
        <Grid verticalAlign={"bottom"} columns="equal" key={`error-message-${i}`}>
          <Grid.Row>
            <Grid.Column width={14}>
              <div style={styles.error}>{message.text}</div>
              {renderHelp(message.rule)}
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
          </Grid.Row>
        </Grid>
      ))}
    </div>
  );
};


export default Messages;
