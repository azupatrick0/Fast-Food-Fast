import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED, USER_SIGNUP_ERROR } from './actionTypes';

const SignupAUser = (userDetails) => (dispatch) => {
    return fetch('https://fast-food-fast.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            role: userDetails.role,
        }),
    })
        .then(res => res.json())
        .then((response) => {
            if (response.status === 'fail') {
                dispatch({
                    type: USER_SIGNUP_FAILED,
                    payload: `Email => ${userDetails.email} already in use, please choose another.`
                });
            }
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: response
            });
            
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('id', response.data.userDetails.id);
            window.localStorage.setItem('name', response.data.userDetails.name);
            window.localStorage.setItem('role', response.data.userDetails.role);
            window.localStorage.setItem('email', response.data.userDetails.email);
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: USER_SIGNUP_ERROR,
                payload: 'An error occured while signing you up, please try again',
            });
        })
}

export default SignupAUser;
