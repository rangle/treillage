import React from 'react';
import marked from 'marked';
import showdown from 'showdown';
import emoji from 'node-emoji';
import PropTypes from 'prop-types';

import { enforceBlockquote, enforceHorizontalRule, replaceWikiLinks } from '../../utils/formatting/markdown';

const renderAsText = (markdown) => (
  <div
    dangerouslySetInnerHTML= {{ __html: marked(replaceWikiLinks(markdown)) }} />
);

const renderAsMarkdown = (markdown) => (
  <pre style={{ whiteSpace: 'pre-wrap' }}>{markdown}</pre>
);

const renderAsHTML = (markdown) => {
  const converter = new showdown.Converter();

  return (
    <pre style={{ whiteSpace: 'pre-wrap' }}>
      {converter.makeHtml(replaceWikiLinks(markdown))}
    </pre>
  );
};

const rendererMap = {
  text: renderAsText,
  markdown: renderAsMarkdown,
  html: renderAsHTML,
};

export const Renderer = ({ markdown, renderAs }) =>
  rendererMap[renderAs](emoji.emojify(enforceBlockquote(enforceHorizontalRule(markdown))));

Renderer.propTypes = {
  markdown: PropTypes.string,
  renderAs: PropTypes.oneOf(['text', 'markdown', 'html']),
};
