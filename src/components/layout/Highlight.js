import React from 'react';
import PropTypes from 'prop-types';

import { formatHighlights } from '../../utils/formatting/markdown';

import { Renderer } from './Renderer';

export const Highlight = ({ item, renderAs }) => (
  <Renderer
    renderAs={renderAs}
    markdown={formatHighlights(item)}
  />
);

Highlight.propTypes = {
  item: PropTypes.object,
  renderAs: PropTypes.oneOf(['text', 'markdown', 'html']),
};
