import React from 'react';
import PropTypes from 'prop-types';

export const Text = (props) => {
  const {
    type,
    style,
    placeholder,
    fieldDefinition,
  } = props;

  return (
    <input
      className="block col-12 mb1 field"
      style={{ ...styles.base, ...style }}
      type={ type }
      placeholder={ placeholder }
      { ...fieldDefinition } />
  );
};

const styles = {
  base: {},
};

Text.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  fieldDefinition: PropTypes.object.isRequired,
};

Text.defaultProps = {
  type: 'preview',
  style: {},
  placeholder: '',
};
