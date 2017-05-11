import { FETCH_CARDS, SET_MARKDOWN_RENDER, SET_CONTENT } from 'redux/constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  content: [],
  error: {},
  renderMarkdown: true,
  loading: false,
});

const ACTION_HANDLERS = {
  [FETCH_CARDS.REQUEST]: (state) => {
    return state.set('loading', true);
  },
  [FETCH_CARDS.SUCCESS]: (state, action) => {
    return state
      .set('content', fromJS(action.result))
      .set('error', fromJS({}))
      .set('loading', false);
  },
  [FETCH_CARDS.FAILURE]: (state, action) => {
    return state
      .set('error', fromJS(action.error))
      .set('loading', false);
  },
  [SET_MARKDOWN_RENDER]: (state, action) => {
    return state.set('renderMarkdown', fromJS(action.renderMarkdown));
  },
  [SET_CONTENT]: (state, action) => {
    return state.set('content', fromJS(action.payload.content));
  },
};

export default function zineReducer(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
