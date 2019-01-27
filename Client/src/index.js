import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import Routes from './routes/index';
// import { store, persistor } from './store';
import store from './store';


render(
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
        <Routes />
    {/* </PersistGate> */}
    </Provider>,
    document.getElementById('root')
);
