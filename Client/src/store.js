import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { SignupReducer, SigninReducer, GetMenuReducer, MakeOrderReducer } from './reducers/index';

const rootReducer = combineReducers({
    signup: SignupReducer,
    signin: SigninReducer,
    getmenu: GetMenuReducer,
    makeorder: MakeOrderReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;