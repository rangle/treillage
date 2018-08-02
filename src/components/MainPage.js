import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clipboard from 'clipboard-js';

import { Container } from './layout/Container';
import { Preview } from './Preview';

export class MainPage extends Component {
  static propTypes = {
    content: PropTypes.array.isRequired,
    error: PropTypes.object,
    renderMarkdown: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { content, error, renderMarkdown, isLoading } = this.props;

    return (
      <Container>
        <Preview
          content={content}
          error={error}
          renderMarkdown={renderMarkdown}
          isLoading={isLoading}
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
