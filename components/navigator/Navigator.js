import React from 'react';

const Navigator = ({ children }) => {
  return (
    <div
      className="flex flex-stretch fixed top-0 left-0 right-0 z3"
      style={styles.base}>
      {children}
    </div>
  );
};

const styles = {
  base: {
    height: '8.5rem',
    justifyContent: 'center',
  },
};

export default Navigator;
