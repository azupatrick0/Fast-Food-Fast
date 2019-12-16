/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authentication from '../../js/utils/Authentication';
import { NotFound, LandingPage, SignupConnected, SigninConnected, Orders, HistoryConnected, AdminConnected } from '../components/index';

class Routes extends Component {

  render() {
    const isAuthenticated = localStorage.getItem('token') !== null ? Authentication(localStorage.getItem('token')) : false;
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={props => <LandingPage {...props} isAuthenticated={isAuthenticated} />} />
          <Route path='/signup' exact render={props => <SignupConnected {...props} isAuthenticated={isAuthenticated} />} />
          <Route path='/signin' exact render={props => <SigninConnected {...props} isAuthenticated={isAuthenticated} />} />
          <Route path='/orders' exact render={props => <Orders {...props} isAuthenticated={isAuthenticated} />} />
          <Route path='/history' exact render={props => <HistoryConnected {...props} isAuthenticated={isAuthenticated} />} />
          <Route path='/admin' exact render={props => <AdminConnected {...props} isAuthenticated={isAuthenticated} />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;