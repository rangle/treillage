import React from 'react';
import marked from 'marked';
import moment from 'moment';
import { updateCard } from '../services/api';
import Button from './ui/Button';
import { Menu } from 'semantic-ui-react';

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

__${item.title}__ ${(item.body || '').replace(/\n/g, ' ')}

`;

const Markdown = ({ markdown, render }) => render ?
  (
    <div
      dangerouslySetInnerHTML= {{ __html: marked(replaceWikiLinks(markdown)) }} />
  ) : (
    <pre style={{ 'white-space': 'pre-wrap' }}>{ markdown }</pre>
  );

const Section = ({ item, render }) => (
  <Markdown
    render={ render }
    markdown={ formatSectionHeader(item) }
   />
);

const Body = ({ item, render }) => {
  const styles = {
    section: {
      'backgroundColor': item.messages.length === 0 ? 'white' : 'pink',
      'border': '1px solid gray',
      'padding': '1em',
    },
    message: {
      fontSize: '12px',
      fontStyle: 'italic',
    },
    pass: {
      color: 'green',
    },
    error: {
      color: 'red',
    },
  };

  return (
    <div style={styles.section}>
      <Markdown
        render={render}
        markdown={formatItem(item)}
       />
       <div style={styles.message}>
         {item.messages.length === 0
         ? <div style={styles.pass} dangerouslySetInnerHTML= {{ __html: PASS }} />
         : item.messages.map((message, i) =>
           <div key={`error-message-${i}`} style={styles.error} dangerouslySetInnerHTML= {{ __html: message }} />)}
       </div>

       {item.messages.length === 0 &&
         <Button
           onClick={ () => updateCard(item.id) }>
           {"Looks good!"}
         </Button>}
    </div>
  );
};

const Zine = ({ content, fetchAllCards, fetchMyCards }) => {
  const styles = {
    content: {
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.content}>
      <Menu pointing secondary>
        <Menu.Item name="all cards" onClick={fetchAllCards} />
        <Menu.Item name="my cards" onClick={fetchMyCards} />
      </Menu>

      { content.map((item, i) => item.isSectionHeading ?
        (<Section key={`item-${i}`} render item={ item } />)
        : (<Body key={`item-${i}`} render item={ item } />)
      )}
      { content.length === 0 && <em>No cards to show.</em> }

      <br/>
      <hr/>
      <sub dangerouslySetInnerHTML= {{ __html: marked(`_${moment().day(1).format('MMMM D')}-${moment().day(5).format('D')}._`) }} />
    </div>
  );
};

export default Zine;
