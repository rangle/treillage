import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import promiseMiddleware from './middleware/promiseMiddleware';
import rootReducer from './redux/rootReducer';

const storageConfig = {
  key: 'react-redux-seed',
  serialize: (store) => {
    return store && store.session ?
      JSON.stringify(store.session.toJS()) : store;
  },
  deserialize: (state) => ({
    session: state ? fromJS(JSON.parse(state)) : fromJS({}),
  }),
};

let composeEnhancers = compose;

if (__DEV__) {
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension;
  }
}

function configureStore(initialState, history) {
  const store = composeEnhancers(
    applyMiddleware(promiseMiddleware, thunk, routerMiddleware(history)),
    persistState('session', storageConfig)
  )(createStore)(connectRouter(history)(rootReducer), initialState);

  if (module.hot) {
    module.hot.accept('./redux/rootReducer', () => {
      const nextRootReducer = require('./redux/rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
