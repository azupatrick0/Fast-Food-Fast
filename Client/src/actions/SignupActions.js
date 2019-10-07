import Axios from 'axios';
import { toast } from 'react-toastify';
import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED, USER_SIGNUP_ERROR } from './actionTypes';

toast.configure();

const SignupAUser = (userDetails) => (dispatch) => {
  return Axios.post(`${process.env.BASE_URL_PROD}/api/v1/auth/signup`, {
    name: userDetails.name,
    email: userDetails.email,
    password: userDetails.password,
    role: userDetails.role,
  }).then((response) => {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('id', response.data.data.userDetails.id);
    localStorage.setItem('name', response.data.data.userDetails.name);
    localStorage.setItem('role', response.data.data.userDetails.role);
    localStorage.setItem('email', response.data.data.userDetails.email);
    if(localStorage.getItem('role') === 'admin') {
      location.href = '/admin';
    } else {
      location.href = '/orders';
    }
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: response.data
    });
    // eslint-disable-next-line no-unused-vars
  }).catch((error) => {
    if (error.response && error.response.status === 409) {
      toast.error('User already exists');
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload: 'User already exists',
      });
    } else {
      toast.error('An error occured while signing you up, please try again');
      dispatch({
        type: USER_SIGNUP_ERROR,
        payload: 'An error occured while signing you up, please try again',
      });
    }
    
  })
}

export default SignupAUser;
