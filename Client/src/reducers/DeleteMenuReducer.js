import {
    START_LOADING,
    STOP_LOADING,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    deletedMealData: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                deletedMealData: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                deletedMealData: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }
       
        case DELETE_MENU_SUCCESS: {
            state = {
                deletedMealData: action.payload,
                status: 'SUCCESS',
                error: ''
            }
            break;
        }
        case DELETE_MENU_ERROR: {
            state = {
                deletedMealData: null,
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
