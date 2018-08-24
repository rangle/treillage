import React from 'react';
import PropTypes from 'prop-types';
import { Renderer } from './Renderer';
import { formatSectionHeader } from '../../utils/formatting/markdown';

export const Section = ({ item, renderAs }) => (
  <Renderer
    renderAs={renderAs}
    markdown={formatSectionHeader(item)}
  />
);

Section.propTypes = {
  item: PropTypes.object,
  renderAs: PropTypes.oneOf(['preview', 'markdown', 'html']),
};
