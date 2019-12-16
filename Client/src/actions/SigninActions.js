import Axios from 'axios';
import { toast } from 'react-toastify';
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_ERROR, START_LOADING } from './actionTypes';

toast.configure();

toast.configure();

const SigninAUser = (userDetails) => (dispatch) => {
  dispatch({
    type: START_LOADING
  });
  return Axios.post(`${process.env.BASE_URL_PROD}/api/v1/auth/login`, {
    email: userDetails.email,
    password: userDetails.password,
  }).then((response) => {
    if (response.data.status === 'success') {
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
      type: USER_SIGNIN_SUCCESS,
      payload: response.data.data.userDetails
      })
    }
  }).catch((error) => {
    if (error.response && error.response.status === 404) {
      toast.error('Seems you are not yet registered, please sign up');
      dispatch({
        type: USER_SIGNIN_ERROR,
        payload: 'Seems you are not yet registered, please sign up',
      });
    } else if (error.response && error.response.status === 401) {
      toast.error('Email or password incorrect');
      dispatch({
        type: USER_SIGNIN_FAILED,
        payload: 'Email or password incorrect'
      });
    } else {
      toast.error('An error occured while signing you in, please try again');
      dispatch({
        type: USER_SIGNIN_ERROR,
        payload: 'An error occured while signing you in, please try again',
      });
    }
  })
}

export default SigninAUser;
