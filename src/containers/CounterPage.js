import React from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions/counter';

import Zine from '../components/zine/Zine';
import Container from '../components/ui/Container';
import Column from '../components/ui/Column';

function mapStateToProps(state) {
  return {
    markdown: state.zine.get('markdown'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch(increment()),
    decreaseCounter: () => dispatch(decrement()),
  };
}

const CounterPage = ({ markdown, increaseCounter, decreaseCounter }) => {
  return (
    <Container>
      <Column className="col-12">
        <Zine
          markdown={ markdown }
          increment={ increaseCounter }
          decrement={ decreaseCounter } />
      </Column>
    </Container>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPage);
