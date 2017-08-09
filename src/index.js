import 'styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './configureStore';

import { fetchMyCards } from 'redux/trello/actions';

const store = configureStore({});

store.dispatch(fetchMyCards());

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
