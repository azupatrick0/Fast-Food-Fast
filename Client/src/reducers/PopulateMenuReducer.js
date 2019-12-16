import {
    START_LOADING,
    STOP_LOADING,
    POPULATE_MENU_SUCCESS,
    POPULATE_MENU_ERROR,
} from '../actions/actionTypes';

const initialState =  {
    addedMealData: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                addedMealData: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                addedMealData: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }
       
        case POPULATE_MENU_SUCCESS: {
            state = {
                addedMealData: action.payload,
                status: 'SUCCESS',
                error: ''
            }
            break;
        }
        case POPULATE_MENU_ERROR: {
            state = {
                addedMealData: null,
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
