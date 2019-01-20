import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { SignupReducer, SigninReducer, GetMenuReducer, MakeOrderReducer, GetHistoryReducer, GetAllOrdersReducer } from './reducers/index';


const rootReducer = combineReducers({
    signup: SignupReducer,
    signin: SigninReducer,
    getmenu: GetMenuReducer,
    makeorder: MakeOrderReducer,
    orderhistory: GetHistoryReducer,
    getorders: GetAllOrdersReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;