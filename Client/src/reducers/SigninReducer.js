import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_ERROR } from '../actions/actionTypes';

const initialState = {
    name: '',
    email: '',
    password: '',
    role: '',
    status: '',
    error: '',
}
export default (state = initialState, action) => {
    switch (action.type) {
       
        case USER_SIGNIN_FAILED: {
            state = {
                status: 'FAILED',
                error: action.payload
            }
            break;
        }
        case USER_SIGNIN_SUCCESS: {
            state = {
                name: action.payload.name,
                role: action.payload.role,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case USER_SIGNIN_ERROR: {
            state = {
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
