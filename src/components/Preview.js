import React from 'react';
import marked from 'marked';
import moment from 'moment';
import { Dimmer, Loader } from 'semantic-ui-react';

import {
  formatSectionHeader,
  formatHighlights,
  formatItem,
  replaceWikiLinks,
} from 'utils/formatting/markdown';
import { updateCard } from 'services/api';
import Button from './inputs/Button';
import Modal from './layout/Modal';
import Messages from './Messages';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  smartypants: false,
});

const Markdown = ({ markdown, render }) => render ?
  (
    <div
      dangerouslySetInnerHTML= {{ __html: marked(replaceWikiLinks(markdown)) }} />
  ) : (
    <pre style={{ whiteSpace: 'pre-wrap' }}>{ markdown }</pre>
  );

const Highlight = ({ item, render }) => (
  <Markdown
    render={ render }
    markdown={ formatHighlights(item) }
  />
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

const Zine = ({ content, error, renderMarkdown, loading, handleClipboard }) => {
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
      <Modal isVisible={error.statusText === 'error'} type={'error'}>
        <div>{`Trello Error: ${error.status} - ${error.responseText}`}</div>
        <div>{"Try reloading this page."}</div>
      </Modal>
      {!renderMarkdown &&
        <Button
          positive
          floated="right"
          onClick={() => handleClipboard(document.getElementById('content').innerText)}
        >Copy to Clipboard
        </Button>
      }
      <div id="content">
        {content.map((item, i) => {
          switch (item.section) {
          case 'highlight':
            return <Highlight key={`item-${i}`} render={renderMarkdown} item={item} />;
          case 'heading':
            return <Section key={`item-${i}`} render={renderMarkdown} item={item} />;
          default:
            return <Body key={`item-${i}`} render={renderMarkdown} item={item} />;
          }
        }
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
