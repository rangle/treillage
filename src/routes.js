import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import MainPage from './components/MainPage';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ MainPage }/>
  </Route>
);
