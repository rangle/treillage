import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './configureStore';

import { fetchAllCards } from './redux/trello/actions';

const store = configureStore({});
syncReduxAndRouter(hashHistory, store);

store.dispatch(fetchAllCards());

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={hashHistory}>
        {routes}
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
