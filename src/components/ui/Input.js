import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
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

Input.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  fieldDefinition: PropTypes.object.isRequired,
};

Input.defaultProps = {
  type: 'text',
  style: {},
  placeholder: '',
};


export default Input;
