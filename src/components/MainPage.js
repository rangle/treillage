import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clipboard from 'clipboard-js';

import { Container } from './layout/Container';
import { Preview } from './Preview';

export class MainPage extends Component {
  constructor() {
    super();

    this.handleRenderAsMarkdown = this.handleRenderAsMarkdown.bind(this);
    this.handleRenderAsHTML = this.handleRenderAsHTML.bind(this);
  }

  render() {
    const { content, error, renderAs, isLoading } = this.props;

    return (
      <Container>
        <Preview
          content={content}
          error={error}
          renderAs={renderAs}
          isLoading={isLoading}
          handleClipboard={this.handleClipboard}
          handleRenderAsMarkdown={this.handleRenderAsMarkdown}
          handleRenderAsHTML={this.handleRenderAsHTML}
        />
      </Container>
    );
  }

  async handleClipboard(elem) {
    try {
      await clipboard.copy(elem);
    } catch (error) {
      throw new Error(error);
    }
  }

  handleRenderAsMarkdown() {
    const { handleRenderAs } = this.props;

    handleRenderAs('markdown');
  }

  handleRenderAsHTML() {
    const { handleRenderAs } = this.props;

    handleRenderAs('html');
  }
}

MainPage.propTypes = {
  content: PropTypes.array.isRequired,
  error: PropTypes.object,
  renderAs: PropTypes.oneOf(['preview', 'markdown', 'html']),
  isLoading: PropTypes.bool.isRequired,
  handleRenderAs: PropTypes.func,
};
