import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history'
import Login from './component/Login'
import User from './component/User'
ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/user" component={User} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.querySelector('#root')
)
