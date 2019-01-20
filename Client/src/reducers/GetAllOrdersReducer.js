import {
    START_LOADING,
    STOP_LOADING,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILED,
    GET_ORDERS_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    orders: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                orders: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                orders: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }
       
        case GET_ORDERS_FAILED: {
            state = {
                orders: null,
                status: 'FAILED',
                error: action.payload
            }
            break;
        }
        case GET_ORDERS_SUCCESS: {
            state = {
                orders: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case GET_ORDERS_ERROR: {
            state = {
                orders: null,
                status: 'ERROR',
                error: action.payload
            }
            break;
        }
        default: {
            state
        }
    }
    return state;
}
