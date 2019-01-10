import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import fetchMock from 'fetch-mock'
import SignupAUser from '../src/actions/index';
import {
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_ERROR,
} from '../src/actions/actionTypes';

require('browser-env')();


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userDetails = {
    name: 'newName',
    email: 'newNameeccssxggsc@mymail.com',
    password: 'newPassword',
    role: 'user'
};

describe('Fast-Food-Fast Actions Test Suite', () => {
    const store = mockStore({});
    describe('Signup Actions', () => {
        beforeEach(() => {
            store.clearActions();
        })
        afterEach(() => {
            fetchMock.restore()
        })

        it('creates USER_SIGNUP_SUCCESS when user has been signed up', () => {
            fetchMock.post('https://fast-food-fast.herokuapp.com/api/v1/auth/signup', {
                body: userDetails,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const exp = [{
                payload: {
                    "email": "newNameeccssxggsc@mymail.com",
                    "name": "newName",
                    "password": "newPassword",
                    "role": "user"
                },
                type: USER_SIGNUP_SUCCESS
            }]


            store.dispatch(SignupAUser(userDetails)).then(() => {
                expect(store.getActions()).to.eql(exp)
            })
        })

        it('creates USER_SIGNUP_ERROR when an error occurs during sign up', () => {
            fetchMock.post('https://fast-food-fast.herokuapp.com/api/v1/auth/signup', {
                body: '',
                headers: {
                    'Content-Type': 'application/json',
                }

            });
            const expectedActions = [{
                type: USER_SIGNUP_ERROR,
                payload: 'An error occured while signing you up, please try again'
            }]


            return store.dispatch(SignupAUser(userDetails)).then(() => {
                expect(store.getActions()).to.eql(expectedActions)
            })
        })
    })
})
