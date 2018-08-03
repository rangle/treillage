import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

import { replaceWikiLinks } from '../../utils/formatting/markdown';

export const Markdown = ({ markdown, render }) => render ?
  (
    <div
      dangerouslySetInnerHTML= {{ __html: marked(replaceWikiLinks(markdown)) }} />
  ) : (
    <pre style={{ whiteSpace: 'pre-wrap' }}>{ markdown }</pre>
  );

Markdown.propTypes = {
  markdown: PropTypes.string,
  render: PropTypes.bool,
};
