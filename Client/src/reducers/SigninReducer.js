/* eslint-disable no-case-declarations */
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_ERROR, START_LOADING } from '../actions/actionTypes';

const initialState = {
  name: '',
  email: '',
  password: '',
  role: '',
  status: '',
  error: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      return Object.assign({}, state, {
        status: 'LOADING',
        error: ''
      });
    }

    case USER_SIGNIN_FAILED: {
      return Object.assign({}, state, {
        status: 'FAILED',
        error: action.payload
      });
    }

    case USER_SIGNIN_SUCCESS: {
      return Object.assign({}, state, {
        name: action.payload.name,
        role: action.payload.role,
        status: 'SUCCESS'
      });
    }

    case USER_SIGNIN_ERROR: {
      return Object.assign({}, state, {
        status: 'ERROR',
        error: action.payload
      });
    }

    default:
      return state;
  }
};
