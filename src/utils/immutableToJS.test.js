import test from 'ava';
import immutableToJS from './immutableToJS';
import { fromJS } from 'immutable';

const mockState = {
  state: {
    name: 'John',
    sons: [{
      name: 'Lill John',
      age: 12,
    }, {
      name: 'Big John',
      age: 34,
    }],
  },
};

const stateWithImmutable = {
  state: fromJS(mockState.state),
};

test('immutableToJS - should ignore regular JS structures', t => {
  t.deepEqual(mockState, immutableToJS(mockState));
});

test('immutableToJS - should convert Immutable structures to JS structures', t => {
  t.deepEqual(mockState, immutableToJS(stateWithImmutable));
});
