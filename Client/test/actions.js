import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import fetchMock from 'fetch-mock'
import { SignupAUser, SigninAUser } from '../src/actions/index';
import {
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_ERROR,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_ERROR,
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
    // FROM: https://www.npmjs.com/package/node-localstorage
    beforeEach(()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ'

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            // eslint-disable-next-line no-global-assign
            localStorage = new LocalStorage('./scratch');
          }
           
          localStorage.setItem('token', token);
          console.log(localStorage.getItem('token'));
    })
    describe('Signup Actions', () => {
        const store = mockStore({});
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

    describe('Signin Actions', () => {
        const store = mockStore({});
        afterEach(() => {
            fetchMock.restore()
        })
        it('creates USER_SIGNIN_SUCCESS when user has been signed in', () => {
            fetchMock.post('https://fast-food-fast.herokuapp.com/api/v1/auth/login', {
                body: {
                    email: 'dkzxcxasdressqwwedfgdsdfswedxxzdfvcd0@gmail.com',
                    password: '$2b$10$JBWg1F.B/GDnzkpTb4dbseVJvjhlisplwMFcRilFOQA4NTa7lUfaW'
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const expectedActions = [{
                type: USER_SIGNIN_SUCCESS,
                payload: {
                    data: {
                        message: "Welcome, xxxxx",
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inh4eHh6enZ2ZGZjY2NnYm5kZmZmZmZmZmF4bWM3OG1jdnYzMzEydnZ2OG1ka2RrenhjeGFzZHJlc3Nxd3dlZGZnZHNkZnN3ZWR4eHpkZnZjZDBAZ21haWwuY29tIiwiaWF0IjoxNTQ3MTM1NDYyLCJleHAiOjE1NDcyMjE4NjJ9.EpekXLJ-Lb1ZYRhOGQ8745P_l2tl4jSKGJ2w9j6fB5Q",
                        userDetails: {
                            createdat: "2019-01-10T14:59:18.605Z",
                            email: "xxxxzzvvdfcccgbndfffffffaxmc78mcvv3312vvv8mdkdkzxcxasdressqwwedfgdsdfswedxxzdfvcd0@gmail.com",
                            id: 69,
                            name: "xxxxx",
                            password: "$2b$10$JBWg1F.B/GDnzkpTb4dbseVJvjhlisplwMFcRilFOQA4NTa7lUfaW",
                            role: "user",
                        }
                    },
                    status: "success"
                },
            }]
            store.dispatch(SigninAUser({
                email: 'xxxxzzvvdfcccgbndfffffffaxmc78mcvv3312vvv8mdkdkzxcxasdressqwwedfgdsdfswedxxzdfvcd0@gmail.com',
                password: '$2b$10$JBWg1F.B/GDnzkpTb4dbseVJvjhlisplwMFcRilFOQA4NTa7lUfaW'
            })).then(() => {
                expect(store.getActions()).to.eql(expectedActions)
            })
         })

        it('creates USER_SIGNIN_ERROR when an error occurs during sign in', () => {
            fetchMock.post('https://fast-food-fast.herokuapp.com/api/v1/auth/login', {
                headers: {
                    'Content-Type': 'application/json',
                }

            });
            const expectedActions = [{
                type: USER_SIGNIN_ERROR,
                payload: 'An error occured while signing you in, please try again'
            }]


            return store.dispatch(SigninAUser({
                email: '',
                password: ''
            })).then(() => {
                expect(store.getActions()).to.eql(expectedActions)
            })
        })
    })
})
