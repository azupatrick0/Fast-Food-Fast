import {
    START_LOADING,
    STOP_LOADING,
    ORDER_MEAL_SUCCESS,
    ORDER_MEAL_FAILED,
    ORDER_MEAL_ERROR
} from '../actions/actionTypes';

const initialState =  {
    orderResponse: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                orderResponse: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                orderResponse: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }
       
        case ORDER_MEAL_FAILED: {
            state = {
                orderResponse: null,
                status: 'FAILED',
                error: action.payload
            }
            break;
        }
        case ORDER_MEAL_SUCCESS: {
            state = {
                orderResponse: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case ORDER_MEAL_ERROR: {
            state = {
                orderResponse: null,
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
