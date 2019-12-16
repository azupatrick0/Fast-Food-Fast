import {
    START_LOADING,
    STOP_LOADING,
    DECLINE_ORDERS_SUCCESS,
    DECLINE_ORDERS_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    declineorders: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                declineorders: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                declineorders: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }

        case DECLINE_ORDERS_SUCCESS: {
            state = {
                declineorders: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case DECLINE_ORDERS_ERROR: {
            state = {
                declineorders: null,
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
