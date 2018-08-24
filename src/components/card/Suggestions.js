import React from 'react';
import PropTypes from 'prop-types';

import { PASS } from '../../services/rules';
import { Button } from '../inputs/Button';

export const Suggestions = ({ suggestions, handleIgnore }) => {
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
      whiteSpace: 'pre',
    },
  };

  const renderHelp = (rule) => {
    let help;

    switch (rule) {
    case 'maxLength':
      help = (
        <div>
          {'Consider making a '}
          <a href="https://docs.google.com/document/u/0/?tgif=d">Google Doc</a>
          {' Or a '}
          <a href="https://github.com/rangle/hub/wiki/_new">Wiki Article</a>
          {' for more space.'}
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
      {suggestions.length === 0
        ? <div style={styles.pass}>{PASS}</div>
        : suggestions.map((suggestion, i) => (
          <div key={`rule-suggestion-${i}`}>
            <div style={styles.error}>{suggestion.text}</div>
            {renderHelp(suggestion.rule)}
            {suggestion.options &&
            suggestion.options.map((option, j) => option === 'ignorable' &&
              <Button
                style={styles.button}
                size="mini"
                key={`suggestion-${i}-option-${j}`}
                onClick={() => handleIgnore(suggestion)}
              >
                {'Ignore'}
              </Button>)}
          </div>
        ))}
    </div>
  );
};

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  handleIgnore: PropTypes.func,
};
