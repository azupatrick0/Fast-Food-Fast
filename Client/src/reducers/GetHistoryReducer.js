import {
    START_LOADING,
    STOP_LOADING,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILED,
    GET_HISTORY_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    history: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                history: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                history: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }
       
        case GET_HISTORY_FAILED: {
            state = {
                history: null,
                status: 'FAILED',
                error: action.payload
            }
            break;
        }
        case GET_HISTORY_SUCCESS: {
            state = {
                history: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case GET_HISTORY_ERROR: {
            state = {
                history: null,
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
