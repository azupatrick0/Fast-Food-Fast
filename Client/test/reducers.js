import { expect } from 'chai';
import bcrypt from 'bcrypt';
import { SignupReducer, SigninReducer, MakeOrderReducer, GetMenuReducer } from '../src/reducers/index';

require('browser-env')();

describe('Fast-Food-Fast Client Reducers Test Suite', () => {
    // FROM: https://www.npmjs.com/package/node-localstorage
    beforeEach(() => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ'

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            // eslint-disable-next-line no-global-assign
            localStorage = new LocalStorage('./scratch');
        }

        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
    })
    describe('Sign up Reducers', () => {
        it('returns status error when an error occurs during sign up', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };
            const state = SignupReducer(initialState,
                {
                    type: 'USER_SIGNUP_ERROR',
                    payload: 'An error occured while signing you up, please try again',
                    error: {}
                });
            expect(state).to.eql({ name: null, email: null, password: null, role: null, status: 'ERROR', error: 'An error occured while signing you up, please try again' });
        });

        it('returns status failed when sign up fails', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };
            const state = SignupReducer(initialState,
                {
                    type: 'USER_SIGNUP_FAILED',
                    payload: 'Email => azupatrick0@gmail.com already in use, please choose another.'
                });

            expect(state).to.eql({
                name: null,
                email: null,
                password: null,
                role: null,
                status: 'FAILED',
                error: 'Email => azupatrick0@gmail.com already in use, please choose another.'
            });
        });

        it('returns updated state after sign up success', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };

            // Encrypt password
            const saltRounds = 10;
            const encryptedPassword = bcrypt.hashSync('dfghjklasdfghgfdsdf23456', saltRounds);
            const state = SignupReducer(initialState,
                {
                    type: 'USER_SIGNUP_SUCCESS',
                    payload: {
                        name: 'azu',
                        email: 'azupatrick00000@gmail.com',
                        password: encryptedPassword,
                        role: 'user',
                        status: 'SUCCESS',
                        error: '',
                    }
                });
            expect(state).to.eql({
                name: 'azu',
                email: 'azupatrick00000@gmail.com',
                password: encryptedPassword,
                role: 'user',
                status: 'SUCCESS',
                error: '',
            });
        });

        it('returns default sign up state if no action is specified', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };
            const state = SignupReducer(initialState,
                {
                    type: '',
                    payload: {
                        name: '',
                        email: '',
                        password: '',
                        role: '',
                        status: '',
                        error: '',
                    }
                });
            expect(state).to.eql({
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            });
        });
        it('should return the sign up initial state', () => {
            expect(SignupReducer(undefined, {})).to.eql({
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            });
        });
    });

    describe('Sign in Reducers', () => {
        it('returns status error when an error occurs during sign in', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };
            const state = SigninReducer(initialState,
                {
                    type: 'USER_SIGNIN_ERROR',
                    payload: 'An error occured while signing you in, please try again',
                    error: {}
                });
            expect(state).to.eql({ name: null, email: null, password: null, role: null, status: 'ERROR', error: 'An error occured while signing you in, please try again' });
        });

        it('returns status failed when sign in fails', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };
            const state = SigninReducer(initialState,
                {
                    type: 'USER_SIGNIN_FAILED',
                    payload: 'Email or password incorrect'
                });

            expect(state).to.eql({
                name: null,
                email: null,
                password: null,
                role: null,
                status: 'FAILED',
                error: 'Email or password incorrect'
            });
        });

        it('returns updated signin state after sign in success', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };

            // Encrypt password
            const saltRounds = 10;
            const encryptedPassword = bcrypt.hashSync('dfghjklasdfghgfdsdf23456', saltRounds);
            const state = SigninReducer(initialState,
                {
                    type: 'USER_SIGNIN_SUCCESS',
                    payload: {
                        name: 'azu',
                        email: 'azupatrick00000@gmail.com',
                        password: encryptedPassword,
                        role: 'user',
                        status: 'SUCCESS',
                        error: '',
                    }
                });
            expect(state).to.eql({
                name: 'azu',
                email: 'azupatrick00000@gmail.com',
                password: encryptedPassword,
                role: 'user',
                status: 'SUCCESS',
                error: '',
            });
        });

        it('returns default signin state if no action is specified', () => {
            const initialState = {
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            };
            const state = SigninReducer(initialState,
                {
                    type: '',
                    payload: {
                        name: '',
                        email: '',
                        password: '',
                        role: '',
                        status: '',
                        error: '',
                    }
                });
            expect(state).to.eql({
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            });
        });
        it('should return the initial signin state', () => {
            expect(SigninReducer(undefined, {})).to.eql({
                name: '',
                email: '',
                password: '',
                role: '',
                status: '',
                error: '',
            });
        });
    });

    describe('Make Orders Reducers', () => {

        it('returns LOADING when loading orders from the server', () => {
            const initialState = {
                orderResponse: null,
                status: '',
                error: '',
            }
            const state = MakeOrderReducer(initialState,
                {
                    type: 'START_LOADING',
                });
            expect(state).to.eql({
                orderResponse: null,
                status: 'LOADING',
                error: '',
            });
        });


        it('returns NOTLOADING when not loading orders from the server', () => {
            const initialState = {
                orderResponse: null,
                status: '',
                error: '',
            }
            const state = MakeOrderReducer(initialState,
                {
                    type: 'STOP_LOADING',
                });
            expect(state).to.eql({
                orderResponse: null,
                status: 'NOTLOADING',
                error: '',
            });
        });

        it('returns status error when an error occurs during making an order', () => {
            const initialState = {
                orderResponse: null,
                status: 'ERROR',
                error: 'An error occured while trying to process your order, please try again',
            }
            const state = MakeOrderReducer(initialState,
                {
                    type: 'ORDER_MEAL_ERROR',
                    payload: 'An error occured while trying to process your order, please try again',
                });
            expect(state).to.eql({ orderResponse: null, status: 'ERROR', error: 'An error occured while trying to process your order, please try again' });
        });

        it('returns status failed when order fails', () => {
            const initialState = {
                orderResponse: null,
                status: '',
                error: '',
            }
            const state = MakeOrderReducer(initialState,
                {
                    type: 'ORDER_MEAL_FAILED',
                    payload: 'Failed to authenticate user token'
                });

            expect(state).to.eql({ orderResponse: null, status: 'FAILED', error: 'Failed to authenticate user token' });
        });

        it('returns updated state after order success', () => {
            const initialState = {
                orderResponse: null,
                status: '',
                error: '',
            }
            const state = MakeOrderReducer(initialState,
                {
                    type: 'ORDER_MEAL_SUCCESS',
                    payload: 'Your order has been processed, thank you'
                });
            expect(state).to.eql({ orderResponse: 'Your order has been processed, thank you', status: 'SUCCESS', error: '' });
        });

        it('returns default make order state if no action is specified', () => {
            const initialState = {
                orderResponse: null,
                status: '',
                error: '',
            }
            const state = MakeOrderReducer(initialState,
                {
                    type: '',
                    payload: {
                        orderResponse: null,
                        status: '',
                        error: '',
                    }
                })
            expect(state).to.eql({
                orderResponse: null,
                status: '',
                error: '',
            });
        });
        it('should return the initial make order state', () => {
            expect(MakeOrderReducer(undefined, {})).to.eql({
                orderResponse: null,
                status: '',
                error: '',
            });
        });
    });

    describe('Get Menu Reducers', () => {

        it('returns LOADING when loading menu from the server', () => {
            const initialState = {
                mealData: null,
                status: '',
                error: '',
            }
            const state = GetMenuReducer(initialState,
                {
                    type: 'START_LOADING',
                });
            expect(state).to.eql({
                mealData: null,
                status: 'LOADING',
                error: '',
            });
        });


        it('returns NOTLOADING when not loading menu from the server', () => {
            const initialState = {
                mealData: null,
                status: '',
                error: '',
            }
            const state = GetMenuReducer(initialState,
                {
                    type: 'STOP_LOADING',
                });
            expect(state).to.eql({
                mealData: null,
                status: 'NOTLOADING',
                error: '',
            });
        });

        it('returns status error when an error occurs during fetching menu', () => {
            const initialState = {
                mealData: null,
                status: 'ERROR',
                error: 'An error occured while retrieving available menu, please try again',
            }
            const state = GetMenuReducer(initialState,
                {
                    type: 'GET_MENU_ERROR',
                    payload: 'An error occured while retrieving available menu, please try again',

                });
            expect(state).to.eql({ mealData: null, status: 'ERROR', error: 'An error occured while retrieving available menu, please try again' });
        });

        it('returns status failed when getting menu fails', () => {
            const initialState = {
                mealData: null,
                status: '',
                error: '',
            }
            const state = GetMenuReducer(initialState,
                {
                    type: 'GET_MENU_FAILED',
                    payload: 'Failed to authenticate user token'
                });

            expect(state).to.eql({ mealData: null, status: 'FAILED', error: 'Failed to authenticate user token' });
        });

        it('returns updated state after fetching menu success', () => {
            const initialState = {
                mealData: null,
                status: '',
                error: '',
            }
            const state = GetMenuReducer(initialState,
                {
                    type: 'GET_MENU_SUCCESS',
                    payload: [
                        {
                            "id": 1,
                            "meal": "Fruttie",
                            "price": 400,
                            "imgurl": "https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg",
                            "createdat": "2018-10-19T21:59:48.634Z",
                            "updatedat": "2018-10-19T21:59:48.634Z"
                        },
                        {
                            "id": 2,
                            "meal": "Burger",
                            "price": 200,
                            "imgurl": "https://res.cloudinary.com/pato/image/upload/v1539986437/psjp6ayhoemdidt8vcro.png",
                            "createdat": "2018-10-19T22:00:39.734Z",
                            "updatedat": "2018-10-19T22:00:39.734Z"
                        },
                        {
                            "id": 3,
                            "meal": "Veggie",
                            "price": 350,
                            "imgurl": "https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png",
                            "createdat": "2018-10-19T22:01:08.732Z",
                            "updatedat": "2018-10-19T22:01:08.732Z"
                        }
                    ]
                });
            expect(state).to.eql({
                mealData: [
                    {
                        "id": 1,
                        "meal": "Fruttie",
                        "price": 400,
                        "imgurl": "https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg",
                        "createdat": "2018-10-19T21:59:48.634Z",
                        "updatedat": "2018-10-19T21:59:48.634Z"
                    },
                    {
                        "id": 2,
                        "meal": "Burger",
                        "price": 200,
                        "imgurl": "https://res.cloudinary.com/pato/image/upload/v1539986437/psjp6ayhoemdidt8vcro.png",
                        "createdat": "2018-10-19T22:00:39.734Z",
                        "updatedat": "2018-10-19T22:00:39.734Z"
                    },
                    {
                        "id": 3,
                        "meal": "Veggie",
                        "price": 350,
                        "imgurl": "https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png",
                        "createdat": "2018-10-19T22:01:08.732Z",
                        "updatedat": "2018-10-19T22:01:08.732Z"
                    }
                ],
                status: 'SUCCESS',
                error: ''
            });
        });

        it('returns default menu state if no action is specified', () => {
            const initialState = {
                mealData: null,
                status: '',
                error: '',
            }
            const state = GetMenuReducer(initialState,
                {
                    type: '',
                    payload: {
                        mealData: null,
                        status: '',
                        error: '',
                    }
                })
            expect(state).to.eql({
                mealData: null,
                status: '',
                error: '',
            });
        });
        it('should return the initial menu state', () => {
            expect(GetMenuReducer(undefined, {})).to.eql({
                mealData: null,
                status: '',
                error: '',
            });
        });
    });
});
