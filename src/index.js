import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import { Router } from 'react-router';
import history from './redux/history';
import routes from './routes';
import configureStore from './configureStore';

import { fetchCards } from './redux/trello/actions';

const store = configureStore({});
syncReduxAndRouter(history, store);

store.dispatch(fetchCards());

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <Router history={ history}>
        { routes }
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
