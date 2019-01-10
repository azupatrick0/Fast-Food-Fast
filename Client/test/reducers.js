import { expect } from 'chai';
import bcrypt from 'bcrypt';
import { SignupReducer, SigninReducer } from '../src/reducers/index';

describe('Fast-Food-Fast Client Reducers Test Suite', () => {
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
                error:'Email => azupatrick0@gmail.com already in use, please choose another.'
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

        it('returns default state if no action is specified', () => {
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
        it('should return the initial state', () => {
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

        it('returns status failed when sign up fails', () => {
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

        it('returns updated state after sign in success', () => {
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

        it('returns default state if no action is specified', () => {
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
        it('should return the initial state', () => {
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
});
