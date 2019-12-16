import {
    START_LOADING,
    STOP_LOADING,
    COMPLETE_ORDERS_SUCCESS,
    COMPLETE_ORDERS_ERROR,
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
                completeorders: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                completeorders: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }

        case COMPLETE_ORDERS_SUCCESS: {
            state = {
                completeorders: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case COMPLETE_ORDERS_ERROR: {
            state = {
                completeorders: null,
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
