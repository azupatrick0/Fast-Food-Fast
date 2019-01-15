import Axios from 'axios';
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_ERROR } from './actionTypes';

const SigninAUser = (userDetails) => (dispatch) => {
    return Axios.post('https://fast-food-fast.herokuapp.com/api/v1/auth/login', {
            email: userDetails.email,
            password: userDetails.password,
    }).then((response) => {
            if (response.data.status === 'fail') {
                dispatch({
                    type: USER_SIGNIN_FAILED,
                    payload: 'Email or password incorrect'
                });
            }
            else if (response.data.status === 'success') {
                dispatch({
                    type: USER_SIGNIN_SUCCESS,
                    payload: response.data
                });
                window.localStorage.setItem('token', response.data.data.token);
                window.localStorage.setItem('id', response.data.data.userDetails.id);
                window.localStorage.setItem('name', response.data.data.userDetails.name);
                window.localStorage.setItem('role', response.data.data.userDetails.role);
                window.localStorage.setItem('email', response.data.data.userDetails.email);
            }
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: USER_SIGNIN_ERROR,
                payload: 'An error occured while signing you in, please try again',
            });
        })
}

export default SigninAUser;
