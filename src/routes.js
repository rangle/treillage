import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import MainContainer from './containers/MainContainer';

export default (
  <App>
    <Route path="/" component={MainContainer} />
  </App>
);
