import { combineReducers } from 'redux';
import trello from './trello/reducer';

const rootReducer = combineReducers({
  trello,
});

export default rootReducer;
