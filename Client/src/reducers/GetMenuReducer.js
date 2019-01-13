import {
    START_LOADING,
    STOP_LOADING,
    GET_MENU_SUCCESS,
    GET_MENU_FAILED,
    GET_MENU_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    mealData: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                mealData: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                mealData: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }
       
        case GET_MENU_FAILED: {
            state = {
                mealData: null,
                status: 'FAILED',
                error: action.payload
            }
            break;
        }
        case GET_MENU_SUCCESS: {
            state = {
                mealData: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case GET_MENU_ERROR: {
            state = {
                mealData: null,
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
