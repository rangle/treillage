import React from 'react';
import PropTypes from 'prop-types';

export const NavigatorItem = ({ children, isVisible = true, className = '' }) => {
  const visibleClass = isVisible ? 'block' : 'hide';

  return (
    <div
      className={ `${ visibleClass } ${ className }` }
      style={ styles.base }>
      { children }
    </div>
  );
};

const styles = {
  base: {},
};

NavigatorItem.propTypes = {
  children: PropTypes.element,
  isVisible: PropTypes.boolean,
  className: PropTypes.string,
};
