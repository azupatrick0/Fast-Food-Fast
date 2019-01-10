import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_ERROR } from './actionTypes';

const SigninAUser = (userDetails) => (dispatch) => {
    return fetch('https://fast-food-fast.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userDetails.email,
            password: userDetails.password,
        }),
    })
        .then(res => res.json())
        .then((response) => {
            if (response.status === 'fail') {
                dispatch({
                    type: USER_SIGNIN_FAILED,
                    payload: 'Email or password incorrect'
                });
            }
            else if (response.status === 'success') {
                dispatch({
                    type: USER_SIGNIN_SUCCESS,
                    payload: response
                });
                window.localStorage.setItem('token', response.data.token);
                window.localStorage.setItem('id', response.data.userDetails.id);
                window.localStorage.setItem('name', response.data.userDetails.name);
                window.localStorage.setItem('role', response.data.userDetails.role);
                window.localStorage.setItem('email', response.data.userDetails.email);
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
