import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ children, style = {}, className = '' }) => {
  return (
    <div className={ `container ${ className }` } style={{ ...styles.base, ...style }}>
      <div className="clearfix">
        { children }
      </div>
    </div>
  );
};

const styles = {
  base: {
    maxWidth: '700px',
    margin: '0 auto',
  },
};

Container.propTypes = {
  children: PropTypes.element,
  style: PropTypes.object,
  className: PropTypes.string,
};
