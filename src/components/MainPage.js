import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './ui/Container';
import Column from './ui/Column';
import Preview from './Preview';

export default class MainPage extends Component {
  static propTypes = {
    content: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    fetchAllCards: PropTypes.func.isRequired,
    fetchMyCards: PropTypes.func.isRequired,
  }

  render() {
    const { content, fetchAllCards, fetchMyCards } = this.props;

    return (
      <Container>
        <Column>
          <Preview
            fetchAllCards={fetchAllCards}
            fetchMyCards={fetchMyCards}
            content={content}
          />
        </Column>
      </Container>
    );
  }
}
