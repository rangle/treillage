import React from 'react';
import marked from 'marked';
import moment from 'moment';

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

__${item.title}__ ${(item.body || 'Why no body???').replace(/\n/g, ' ')}

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
    markdown={ formatSectionHeader(item) } />
);

const countWords = (item) => (item.title + ' ' + item.body).split(' ').length;

const Body = ({ item, render}) => {
  const length = countWords(item);
  const isTooLong = length > 100;
  const bgColor = isTooLong ? 'pink' : 'white';

  return (
    <div key={ item.title } style = {{
      'background-color': bgColor,
      'border': '1px solid gray',
      'padding': '1em',
    }} >
      <Markdown key={ item.title }
        render={ render }
        length
        markdown = { formatItem(item) } />

      { render ?
          <i>{
            isTooLong ?
              `${ length } words. Please shorten!`
              : `${ length } words.`
          }</i>
          : ''
      }
    </div>
  );
};

const Zine = ({ content }) => (
  <div style={{ fontSize: '14pt' }}>

    { content.map((item) => item.isSectionHeading ?
      (<Section render item = { item } />)
      : (<Body render item = { item } />)
    )}

    <br/>
    <hr/>

    _{moment().day(1).format('MMMM D')}–{moment().day(5).format('D')}._

    { content.map((item) => item.isSectionHeading ?
      (<Section item = { item } />)
      : (<Body item = { item } />)
    )}

  </div>
);

export default Zine;
