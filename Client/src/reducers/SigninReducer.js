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
                name: null,
                email: null,
                password: null,
                role: null,
                status: 'FAILED',
                error: action.payload
            }
            break;
        }
        case USER_SIGNIN_SUCCESS: {
            state = {
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                role: action.payload.role,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case USER_SIGNIN_ERROR: {
            state = {
                name: null,
                email: null,
                password: null,
                role: null,
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
