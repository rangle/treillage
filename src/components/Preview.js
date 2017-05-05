import React from 'react';
import marked from 'marked';
import moment from 'moment';
import { Dimmer, Loader } from 'semantic-ui-react';

import { updateCard } from '../services/api';
import Button from './ui/Button';
import Messages from './Messages';

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

# ${ item.title }

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
    <pre style={{ whiteSpace: 'pre-wrap' }}>{ markdown }</pre>
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
      'marginBottom': '16px',
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

  const handleIgnore = (message) => {
    item.messages.splice(item.messages.indexOf(message));
  };

  return (
    <div style={styles.section}>
      <Markdown
        render={render}
        markdown={formatItem(item)}
       />
       {render &&
         <div>
           <Messages list={item.messages} handleIgnore={handleIgnore} />
           {item.messages.length === 0 &&
             <Button positive onClick={ () => updateCard(item.id) }>{"Approve"}</Button>
           }
         </div>
       }
    </div>
  );
};

const Zine = ({ content, renderMarkdown, loading, handleClipboard }) => {
  const styles = {
    page: {
      marginTop: '6rem',
      fontSize: '16px',
    },
    footer: {
      marginTop: '6rem',
      fontSize: '14px',
      fontStyle: 'italic',
    },
  };
  if (loading) {
    return (
      <div>
        <Dimmer active>
         <Loader />
       </Dimmer>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {!renderMarkdown &&
        <Button
          positive
          floated="right"
          onClick={() => handleClipboard(document.getElementById('content'))}
        >Copy to Clipboard
        </Button>
      }
      <div id="content">
        {content.map((item, i) => item.isSectionHeading
          ? (<Section key={`item-${i}`} render={renderMarkdown} item={item} />)
          : (<Body key={`item-${i}`} render={renderMarkdown} item={item} />)
        )}
      </div>
      {content.length === 0 && <em>No cards to show.</em>}
      {!renderMarkdown &&
        <Button
          positive
          floated="right"
          onClick={() => handleClipboard(document.getElementById('content'))}
        >Copy to Clipboard
        </Button>
      }
      <div style={styles.footer}>
        <hr/>
        <div dangerouslySetInnerHTML= {{ __html: marked(`_${moment().day(1).format('MMMM D')}-${moment().day(5).format('D')}._`) }} />
      </div>
    </div>
  );
};

export default Zine;
