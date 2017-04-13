import React from 'react';
import marked from 'marked';
import moment from 'moment';

import { PASS } from '../services/rules';

marked.setOptions({
  renderer: new marked.Renderer(),
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

const formatByline = byline => byline
  .split(' and ')
  .map((person) => '[[' + person.trim() + ']]')
  .join(' and ');

const formatSectionHeader = (item) => `

## ${ item.title }

_Section edited by ${ formatByline(item.byline) }._

`;

const addImageUrl = (item) => item.image ? `

![Item cover image](${item.image})

` : '';

const formatItem = (item) => `${addImageUrl(item)}

__${item.title}__ ${(item.body || '- Empty Body -').replace(/\n/g, ' ')}

`;

const Markdown = ({ key, markdown, render }) => render ?
  (
    <div key={key}
      dangerouslySetInnerHTML= {{ __html: marked(replaceWikiLinks(markdown)) }} />
  ) : (
    <pre style={{ 'white-space': 'pre-wrap' }}>{ markdown }</pre>
  );

const Section = ({ item, render }) => (
  <Markdown key={ item.title }
    render={ render }
    markdown={ formatSectionHeader(item) }
   />
);

const Body = ({ item, render }) => {
  const bgColor = item.message === PASS ? 'white' : 'pink';

  return (
    <div key={ item.title } style = {{
      'backgroundColor': bgColor,
      'border': '1px solid gray',
      'padding': '1em',
    }} >
      <Markdown key={ item.title }
        render={ render }
        markdown={ formatItem(item) }
       />
       {item.message === PASS
       ? <sub style={{'color': 'green'}} dangerouslySetInnerHTML= {{ __html: PASS }} />
       : <sub style={{'color': 'red'}} dangerouslySetInnerHTML= {{ __html: item.message }} />}
    </div>
  );
};

const Zine = ({ content }) => (
  <div style={{ fontSize: '14pt' }}>

    { content.map((item, i) => item.isSectionHeading ?
      (<Section key={`item-${i}`} render item={ item } />)
      : (<Body key={`item-${i}`} render item={ item } />)
    )}

    <br/>
    <hr/>
    <sub dangerouslySetInnerHTML= {{ __html: marked(`_${moment().day(1).format('MMMM D')}-${moment().day(5).format('D')}._`) }} />
  </div>
);

export default Zine;
