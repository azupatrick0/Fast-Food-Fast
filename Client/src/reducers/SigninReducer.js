import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_ERROR } from '../actions/actionTypes';

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
		case USER_SIGNIN_FAILED:
			return (state = Object.assign({
				status: 'FAILED',
				error: action.payload
			}));

		case USER_SIGNIN_SUCCESS:
			return (state = Object.assign({
				name: action.payload.name,
				role: action.payload.role,
				status: 'SUCCESS'
			}));

		case USER_SIGNIN_ERROR:
			return (state = Object.assign({
				status: 'ERROR',
				error: action.payload
			}));

		default:
			return state;
	}
};
