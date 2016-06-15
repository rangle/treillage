import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../App';
import MainPage from '../MainPage';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ MainPage }/>
  </Route>
);
