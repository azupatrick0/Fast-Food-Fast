import Axios from 'axios';
import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED, USER_SIGNUP_ERROR } from './actionTypes';

const SignupAUser = (userDetails) => (dispatch) => {
    return Axios.post(`${process.env.BASE_URL_PROD}/api/v1/auth/signup`, {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            role: userDetails.role,
    }).then((response) => {
            if (response.data.status === 'fail') {
                dispatch({
                    type: USER_SIGNUP_FAILED,
                    payload: `Email => ${userDetails.email} already in use, please choose another.`
                });
            }
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: response.data
            });
            
            window.localStorage.setItem('token', response.data.data.token);
            window.localStorage.setItem('id', response.data.data.userDetails.id);
            window.localStorage.setItem('name', response.data.data.userDetails.name);
            window.localStorage.setItem('role', response.data.data.userDetails.role);
            window.localStorage.setItem('email', response.data.data.userDetails.email);
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: USER_SIGNUP_ERROR,
                payload: 'An error occured while signing you up, please try again',
            });
        })
}

export default SignupAUser;
