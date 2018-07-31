import React from 'react';
import PropTypes from 'prop-types';
import { Button as SemanticButton } from 'semantic-ui-react';

export const Button = (props) => {
  const {
    children,
    className = '',
    type = 'button',
    onClick,
    disabled = false,
    ...rest
  } = props;

  return (
    <SemanticButton
      type={ type }
      className={ `btn ${ className }` }
      onClick={ onClick }
      disabled={disabled}
      {...rest}
    >
      { children }
    </SemanticButton>
  );
};

Button.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
