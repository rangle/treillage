import 'basscss/css/basscss.min.css';
import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';
import configureStore from './configureStore';

import { fetchMyCards } from './redux/trello/actions';

const history = createBrowserHistory();
const store = configureStore({}, history);
store.dispatch(fetchMyCards());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
