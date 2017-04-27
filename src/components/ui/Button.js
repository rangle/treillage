import React from 'react';
import PropTypes from 'prop-types';
import { Button as SemanticButton } from 'semantic-ui-react';

const Button = (props) => {
  const {
    children,
    className = '',
    type = 'button',
    onClick,
    disabled = false,
    ...rest,
  } = props;

  return (
    <SemanticButton
      type={ type }
      className={ `btn ${ className }` }
      onClick={ onClick }
      {...rest}
    >
      { children }
    </SemanticButton>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
