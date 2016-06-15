import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import trello from './trello.reducer';

const rootReducer = combineReducers({
  trello,
  routing: routeReducer,
  form: formReducer,
});

export default rootReducer;
