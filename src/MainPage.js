import React from 'react';
import { connect } from 'react-redux';

import Preview from './Preview';
import Container from './components/ui/Container';
import Column from './components/ui/Column';

function mapStateToProps(state) {
  return {
    content: state.trello.get('content').toJS(),
  };
}

function mapDispatchToProps() {
  return {};
}

const CounterPage = ({ content }) => {
  return (
    <Container>
      <Column className="col-12">
        <Preview
          content={ content } />
      </Column>
    </Container>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPage);
