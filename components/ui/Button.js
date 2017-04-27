import React from 'react';
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
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

export default Button;
