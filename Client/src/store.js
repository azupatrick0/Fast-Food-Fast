import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import SignupReducer from './reducers/index';

const store = createStore(SignupReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;