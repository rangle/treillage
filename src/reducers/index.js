import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import zine from './zine';
import session from './session';

const rootReducer = combineReducers({
  session,
  zine,
  routing: routeReducer,
  form: formReducer,
});

export default rootReducer;
