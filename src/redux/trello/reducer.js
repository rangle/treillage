import { FETCH_CARDS, SET_MARKDOWN_RENDER, SET_CONTENT } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  content: [],
  renderMarkdown: true,
  loading: false,
});

function zineReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

  case FETCH_CARDS:
    return state.set('loading', fromJS(action.payload.loading));

  case SET_MARKDOWN_RENDER:
    return state.set('renderMarkdown', fromJS(action.payload.renderMarkdown));

  case SET_CONTENT:
    return state
            .set('content', fromJS(action.payload.content))
            .set('loading', fromJS(action.payload.loading));

  default:
    return state;
  }
}

export default zineReducer;
