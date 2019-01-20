import {
    START_LOADING,
    STOP_LOADING,
    ACCEPT_ORDERS_SUCCESS,
    ACCEPT_ORDERS_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    acceptorders: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                acceptorders: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                acceptorders: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }

        case ACCEPT_ORDERS_SUCCESS: {
            state = {
                acceptorders: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case ACCEPT_ORDERS_ERROR: {
            state = {
                acceptorders: null,
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
