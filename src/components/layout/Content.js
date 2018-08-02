import React from 'react';
import PropTypes from 'prop-types';

export const Content = ({ children, style = {}, isVisible }) => {
  return (
    <div
      className={ 'mt4 m2 p1' }
      style={{ ...styles.base, style }}>
      { isVisible ? children : null }
    </div>
  );
};

const styles = {
  base: {},
};

Content.propTypes = {
  children: PropTypes.element,
  style: PropTypes.object,
  isVisible: PropTypes.bool,
};
