import {
    START_LOADING,
    STOP_LOADING,
    UPDATE_MENU_SUCCESS,
    UPDATE_MENU_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    updatedMealData: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                updatedMealData: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                updatedMealData: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }
       
        case UPDATE_MENU_SUCCESS: {
            state = {
                updatedMealData: action.payload,
                status: 'SUCCESS',
                error: ''
            }
            break;
        }
        case UPDATE_MENU_ERROR: {
            state = {
                updatedMealData: null,
                status: 'ERROR',
                error: action.payload,
            }
            break;
        }

        default: {
            state
        }
    }
    return state;
}
