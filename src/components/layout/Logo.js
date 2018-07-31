import React from 'react';
import PropTypes from 'prop-types';

import LogoImage from '../../assets/rangleio-logo.svg';

export const Logo = ({ style = {} }) => {
  return (
    <img
      style={{ ...styles.base, ...style }}
      src={ LogoImage }
      alt="Rangle.io" />
  );
};

const styles = {
  base: {
    width: 128,
  },
};

Logo.propTypes = {
  style: PropTypes.object,
};
