import React from 'react';
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';
import LandingPage from '../../src/components/LandingPage';
import { NotFound } from '../components/index';

const Routes = () => (
    <BrowserRouter history={browserHistory}>
        <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/index' exact component={LandingPage} />
                <Route path='/index.html' exact component={LandingPage} />
                <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;