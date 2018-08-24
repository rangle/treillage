import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import moment from 'moment';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Options } from './card/Options';
import { Body } from './card/Body';
import { Section } from './card/Section';
import { Modal } from './layout/Modal';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  smartypants: false,
});

export const Preview = ({
  content,
  error,
  renderAs,
  isLoading,
  handleClipboard,
  handleRenderAsMarkdown,
  handleRenderAsHTML,
}) => {
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
      {renderAs !== 'text' && (
        <Options
          handleClipboard={handleClipboard}
          handleRenderAsMarkdown={handleRenderAsMarkdown}
          handleRenderAsHTML={handleRenderAsHTML}
          renderAs={renderAs}
        />
      )}
      <div id="content">
        {content.map((item, i) => item.isSectionHeading
          ? (<Section key={`item-${i}`} renderAs={renderAs} item={item} />)
          : (<Body key={`item-${i}`} renderAs={renderAs} item={item} />)
        )}
      </div>
      {content.length === 0 && <em>No cards to show.</em>}
      {renderAs !== 'text' && (
        <Options
          handleClipboard={handleClipboard}
          handleRenderAsMarkdown={handleRenderAsMarkdown}
          handleRenderAsHTML={handleRenderAsHTML}
          renderAs={renderAs}
        />
      )}
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
  renderAs: PropTypes.oneOf(['text', 'markdown', 'html']),
  isLoading: PropTypes.bool,
  handleClipboard: PropTypes.func,
  handleRenderAsMarkdown: PropTypes.func,
  handleRenderAsHTML: PropTypes.func,
};
