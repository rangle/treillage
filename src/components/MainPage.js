import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clipboard from 'clipboard-js';

import Container from './layout/Container';
import Preview from './Preview';

export default class MainPage extends Component {
  static propTypes = {
    content: PropTypes.array.isRequired,
    error: PropTypes.object,
    renderMarkdown: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
  }

  render() {
    const { content, error, renderMarkdown, loading } = this.props;

    return (
      <Container>
        <Preview
          content={content}
          error={error}
          renderMarkdown={renderMarkdown}
          loading={loading}
          handleClipboard={this.handleClipboard}
        />
      </Container>
    );
  }

  async handleClipboard(elem) {
    try {
      await clipboard.copy(elem);
      console.log('copied!');
    } catch (error) {
      console.error(error);
    }
  }
}
