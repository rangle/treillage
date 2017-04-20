import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import MainContainer from './containers/MainContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainContainer} />
  </Route>
);
