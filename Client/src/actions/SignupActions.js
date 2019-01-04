import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED, USER_SIGNUP_ERROR } from './actionTypes';

const SignupAUser = (userDetails) => (dispatch) => {
   fetch('https://fast-food-fast.herokuapp.com/api/v1/auth/signup', {
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
        if (response.data.message === `email => ${userDetails.email} already in use, please choose another.`) {
        document.querySelector('.modal').style.display = 'block';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signupText').innerHTML = 'Sign Up';
            dispatch({
                type: USER_SIGNUP_FAILED,
                payload: `Email => ${userDetails.email} already in use, please choose another.`
            });
        } else if (response.data.message === 'New user created') {
            const {
                id,
                name,
                role,
                email,
            } = response.data.userDetails;

            const { token } = response.data;

            window.localStorage.setItem('token', token);
            window.localStorage.setItem('id', id);
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('role', role);
            window.localStorage.setItem('email', email);
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: response.data.userDetails
            });
        }
    }).catch((error) => {
        // Internal server error
        document.querySelector('.modal').style.display = 'block';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signupText').innerHTML = 'Sign Up';
        dispatch({
            type: USER_SIGNUP_ERROR,
            payload: 'An error occured while signing you up, please try again',
            error
        });
    })
}

export default SignupAUser;
