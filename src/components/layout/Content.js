import React from 'react';

const Content = ({ children, style = {}, isVisible }) => {
  return (
    <div
      className={ `mt4 m2 p1` }
      style={{ ...styles.base, style }}>
      { isVisible ? children : null }
    </div>
  );
};

const styles = {
  base: {},
};

export default Content;
