import test from 'ava';
import fireAction from './fireAction';

const INITIAL_STATE = {
  test: false,
};

const mockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'test':
    state.test = true;
    return state;

  default:
    return state;
  }
};

test('it should fire the provided action against the provided reducer', t => {
  const state = fireAction(mockReducer, INITIAL_STATE, 'test');
  t.truthy(state.test);
});
