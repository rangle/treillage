import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import trello from './trello/reducer';

const rootReducer = combineReducers({
  trello,
  routing: routeReducer,
});

export default rootReducer;
