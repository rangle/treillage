import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import Column from './ui/Column';
import Preview from './Preview';

export default class MainPage extends Component {
  static propTypes = {
    content: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
  }

  render() {
    const { content} = this.props;

    return (
      <Container>
        <Column>
          <Preview
            content={content}
          />
        </Column>
      </Container>
    );
  }
}
