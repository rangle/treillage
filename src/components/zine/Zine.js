import React from 'react';
import marked from 'marked';

marked.setOptions({
  gfm: true,
  smartypants: false,
});

function getWikiLink(code) {
  const linkBaseUrl = 'https://github.com/rangle/hub/wiki/';
  const parts = code.split('|');
  const visibleText = parts[0];
  const link = (parts[1] || parts[0]).replace(/\s/g, '-');
  return `[${visibleText}](${linkBaseUrl}${link})`;
}

function replaceWikiLinks(body) {
  return body.replace(
    /\[\[(.*?)\]\]/g,
    (_, match) => getWikiLink(match)
  );
}

const Zine = ({ markdown }) => (
  <div>
    <span dangerouslySetInnerHTML= {{ __html: marked(replaceWikiLinks(markdown)) }} />
    <br/>
    <hr/>
    <br/>
    <br/>
    <pre style={{ 'white-space': 'pre-wrap', 'font-size': '8pt' }}>
      { markdown }
    </pre>
  </div>
);

export default Zine;
