import { FETCH_CARDS, SET_CONTENT, SET_RENDER_AS } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  content: [],
  error: {},
  renderAs: 'preview',
  isLoading: false,
});

const ACTION_HANDLERS = {
  [FETCH_CARDS.REQUEST]: (state) => {
    return state.set('isLoading', true);
  },
  [FETCH_CARDS.SUCCESS]: (state, action) => {
    return state
      .set('content', fromJS(action.result))
      .set('error', fromJS({}))
      .set('isLoading', false);
  },
  [FETCH_CARDS.FAILURE]: (state, action) => {
    return state
      .set('error', action.error.stack)
      .set('isLoading', false);
  },
  [SET_RENDER_AS]: (state, action) => {
    return state.set('renderAs', fromJS(action.payload.renderAs));
  },
  [SET_CONTENT]: (state, action) => {
    return state.set('content', fromJS(action.payload.content));
  },
};

export default function zineReducer(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
