import React from 'react';
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';
import { NotFound, LandingPage, SignupConnected, SigninConnected, OrdersConnected, HistoryConnected, AdminConnected } from '../components/index';

const Routes = () => (
    <BrowserRouter history={browserHistory}>
        <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/index' exact component={LandingPage} />
                <Route path='/index.html' exact component={LandingPage} />
                <Route path='/signup' exact component={SignupConnected} />
                <Route path='/signin' exact component={SigninConnected} />
                <Route path='/orders' exact component={OrdersConnected} />
                <Route path='/history' exact component={HistoryConnected} />
                <Route path='/admin' exact component={AdminConnected} />
                <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;