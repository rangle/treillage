import React from 'react';
import PropTypes from 'prop-types';

const componentColor = {
  info: 'bg-blue white',
  warning: 'bg-yellow black',
  success: 'bg-green black',
  error: 'bg-red white',
};

export const Alert = ({ children, isVisible, status = 'info', className = '', style = {}}) => {
  const visibleClass = isVisible ? 'block' : 'hide';

  return (
    <div
      className={ `${ className } p2 bold ${ visibleClass } ${ componentColor[status] || 'info' }` }
      style={{ ...styles.base, ...style }}>
      { children }
    </div>
  );
};

const styles = {
  base: {},
};

Alert.propTypes = {
  children: PropTypes.element,
  isVisible: PropTypes.boolean,
  status: PropTypes.OneOf(['info', 'warning', 'success', 'error']),
  className: PropTypes.string,
  style: PropTypes.Object,
};
