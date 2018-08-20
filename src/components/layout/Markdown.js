import React from 'react';
import marked from 'marked';
import emoji from 'node-emoji';
import PropTypes from 'prop-types';

import { replaceWikiLinks } from '../../utils/formatting/markdown';

export const Markdown = ({ markdown, render }) => render ?
  (
    <div
      dangerouslySetInnerHTML= {{ __html: marked(replaceWikiLinks(emoji.emojify(markdown))) }} />
  ) : (
    <pre style={{ whiteSpace: 'pre-wrap' }}>{ emoji.emojify(markdown) }</pre>
  );

Markdown.propTypes = {
  markdown: PropTypes.string,
  render: PropTypes.bool,
};
