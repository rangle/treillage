import { SET_MARKDOWN } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  markdown: '',
});

function zineReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

  case SET_MARKDOWN:
    return state.set('markdown', action.payload.markdown);

  default:
    return state;
  }
}

export default zineReducer;
