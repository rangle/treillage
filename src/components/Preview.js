import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import moment from 'moment';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Body } from './layout/Body';
import { Section } from './layout/Section';
import { Modal } from './layout/Modal';
import { Button } from './inputs/Button';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  smartypants: false,
});

export const Preview = ({ content, error, renderMarkdown, isLoading, handleClipboard }) => {
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
  if (isLoading) {
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
        <div>{'Try reloading this page.'}</div>
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

Preview.propTypes = {
  content: PropTypes.array,
  error: PropTypes.object,
  renderMarkdown: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleClipboard: PropTypes.func,
};
