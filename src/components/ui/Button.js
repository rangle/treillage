import React from 'react';

const Button = (props) => {
  const {
    children,
    className = '',
    style = {},
    type = 'button',
    onClick,
    disabled,
  } = props;

  return (
    <button
      type={ type }
      className={ `btn btn-primary  ${ className }` }
      style={{ ...styles.base, ...style }}
      onClick={ onClick }
      disabled={ disabled } >
      { children }
    </button>
  );
};

const styles = {
  base: {},
};

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  type: 'button',
  style: {},
  disabled: true,
};


export default Button;
