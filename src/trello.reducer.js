import { SET_CONTENT } from './constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  content: [],
});

function zineReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

  case SET_CONTENT:
    return state.set('content', fromJS(action.payload.content));

  default:
    return state;
  }
}

export default zineReducer;
