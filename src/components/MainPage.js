import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import Preview from './Preview';

export default class MainPage extends Component {
  static propTypes = {
    content: PropTypes.array.isRequired,
    renderMarkdown: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
  }

  render() {
    const { content, renderMarkdown, loading } = this.props;

    return (
      <Container>
        <Preview
          content={content}
          renderMarkdown={renderMarkdown}
          loading={loading}
        />
      </Container>
    );
  }
}
