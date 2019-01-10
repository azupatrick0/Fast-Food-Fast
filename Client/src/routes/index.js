import React from 'react';
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';
import { NotFound, LandingPage, SignupConnected, SigninConnected } from '../components/index';

const Routes = () => (
    <BrowserRouter history={browserHistory}>
        <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/index' exact component={LandingPage} />
                <Route path='/index.html' exact component={LandingPage} />
                <Route path='/Signup' exact component={SignupConnected} />
                <Route path='/Signin' exact component={SigninConnected} />
                <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;