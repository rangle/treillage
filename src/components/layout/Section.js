import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from './Markdown';
import { formatSectionHeader } from '../../utils/formatting/markdown';

export const Section = ({ item, render }) => (
  <Markdown
    render={ render }
    markdown={ formatSectionHeader(item) }
  />
);

Section.propTypes = {
  item: PropTypes.object,
  render: PropTypes.bool,
};
